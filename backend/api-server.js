const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const jwtKey = 'abc1234567'
const members = [
  {
    id: 3,
    name: '도서관',
    loginId: 'lib',
    loginPw: 'africa'
  },
  {
    id: 4,
    name: '홍길동',
    loginId: 'a',
    loginPw: '1'
  },
]
// parse application/json
app.use(bodyParser.json()).use(cookieParser())

app.get('/api/account', (req, res) => {
  console.log('cookie', req.cookies)
  if (req.cookies && req.cookies.token) {
    jwt.verify(req.cookies.token, jwtKey, (err, decoded) => {
      if(err) {
        return res.status(401).json({ error: '토큰 에러'})
      }
      res.send(decoded)
    })
  } else { // 쿠키가 없을 때
    res.status(401).json({ error: '권한이 없습니다. 로그인을 해주세요.'}) // 로그인을 안했을 때 권한이 없다라는 표시
  }
})

app.post('/api/account', (req, res) => {
  const loginId = req.body.loginId
  const loginPw = req.body.loginPw

  const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw)
  
  if(member) {
    const token = jwt.sign({
      id: member.id,
      name: member.name
    }, jwtKey, {
      expiresIn: "15m",
      issuer: 'africalib'
    })
    res.cookie('token', token);
    jwt.verify(req.cookies.token, jwtKey, (err, decoded) => {
      if(err) {
        return res.status(401).json({ error: '토큰 에러'})
      }
      res.send(decoded)
    })
  } else {
    res.status(404).json({ error: '로그인 실패'})
  }
}) // 여기서  req.body의 값을 받기 위해선 body-parser를 다운로드.

app.delete('/api/account', (req, res) => {
  if(req.cookies && req.cookies.token) {
    res.clearCookie('token')
  }

  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
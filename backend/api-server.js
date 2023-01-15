const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const jwtKey = 'abc1234567'
const database = require("./loginDatabase")

// parse application/json
app.use(bodyParser.json()).use(cookieParser())
// 로그인
let users = []
app.get('/api/account', async (req, res) => {
  users = await database.run('SELECT * FROM users')
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

app.post('/api/account', async (req, res) => {
  const loginId = req.body.loginId
  const loginPw = req.body.loginPw

  const user = users.find(u => u.userId === loginId && u.password === loginPw)
  console.log(user)
  if(user) {
    const token = jwt.sign({
      id: user.userId,
      name: user.name
    }, jwtKey, {
      expiresIn: "3h",
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
// 회원가입

app.get('/api/users', async (req, res) => {
  const result = await database.run('SELECT * FROM users')
  res.send(result)
})

app.post('/api/users', async (req, res) => {
  await database.run(`INSERT INTO users (userId, password, name) VALUES('${req.body.userInfo.signId}', '${req.body.userInfo.signPw}', '${req.body.userInfo.signName}')`)
  const result = await database.run('SELECT * FROM users')
  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors())
// cors()안을 비워놓으면 모든 HTML요청을 허용.

console.log('hi')
app.get("/", function (req: any, res: any) {
  res.send("Hello World");
});
app.get("/sound/:name", (req: any, res: any) => {
  const { name } = req.params
  if (name == "dog") {
    res.json({'sound' : '멍멍'})
  } else if (name == "cat") {
    res.json({'sound' : '야용'})
  } else {
    res.json({'sound' : '굴굴'})
  }
  console.log(name)
});
app.get("/cat", (req: any, res: any) => {
  // res.send("고양이");
  res.json({ 'sound': '나옹' });
});
app.listen(port);

const express = require("express");
const app = express();
const port = 3030;

//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  // //允许的header类型
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  // //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/yktoken", (req, res) => {
  res.cookie("stateless_session_id", "2aada380-780e-48dc-acdb-26ba8d4ae176", {
    // domain: "ykdim.yingketech.com",
    secure: true,
    sameSite: "none",
  });
  res.cookie("stateless_session_id_time", Date.now(), {
    // domain: "ykdim.yingketech.com",
    secure: true,
    sameSite: "none",
  });
  res.send({ result: "OK" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

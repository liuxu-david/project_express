const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const {
  handleVerify,
  handleUpload,
  handleMerge,
} = require("./api_handle/upload");

const app = express();
const upload = multer({ dest: "./uploadsFiles" }); //设置存放目录

app.use(bodyParser.json()); // 解析 JSON 格式的请求体
app.use(bodyParser.urlencoded({ extended: false })); //解析 URL-encoded 格式的请求体

app.get("/", function (req, res) {
  res.send("hello");
});

app.post("/verify", handleVerify);
app.post("/upload", upload.single("file"), handleUpload);
app.post("/merge", handleMerge);

const port = 5000;
app.listen(port, () => {
  console.log(`该项目运行在${port}端口上`);
});

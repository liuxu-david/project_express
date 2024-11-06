const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const {
  handleVerify,
  handleUpload,
  handleMerge,
} = require("./src/services/upload");
const devConfig = require("./src/config/env.development");
const prodConfig = require("./src/config/env.production");

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

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV, devConfig.name);
} else {
  console.log(process.env.NODE_ENV, prodConfig.name);
}

const port = 5000;
app.listen(port, () => {
  console.log(`该项目运行在${port}端口上`);
});

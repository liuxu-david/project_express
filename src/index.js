const express = require("express");
const bodyParser = require("body-parser");
const devConfig = require("./config/env.development");
const prodConfig = require("./config/env.production");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
app.use(bodyParser.json()); // 解析 JSON 格式的请求体
app.use(bodyParser.urlencoded({ extended: false })); //解析 URL-encoded 格式的请求体

app.get("/api", (req, res) => {
  res.send("hello");
});
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV, devConfig.name);
} else {
  console.log(process.env.NODE_ENV, prodConfig.name);
}

const port = 5000;
app.listen(port, () => {
  console.log(`该项目运行在${port}端口上`);
});

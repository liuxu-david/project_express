const express = require("express");
const bodyParser = require("body-parser");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/usersRoutes");
const sequelize = require("./db/mysql");
const morgan = require("./middlewares/logger");
const { name } = require("./config");

const app = express();
app.use(bodyParser.json()); // 解析 JSON 格式的请求体
app.use(bodyParser.urlencoded({ extended: false })); //解析 URL-encoded 格式的请求体
app.use(morgan);

app.use("/api/upload", uploadRoutes);
app.use("/api/user", userRoutes);

// 同步模型到数据库,如果该表未创建，会创建，如果已经存在则不做什么操作
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Failed to synchronize database:", error);
  });

const port = 5000;
app.listen(port, () => {
  console.log(`该项目运行在${port}端口上,环境：${name}`);
});

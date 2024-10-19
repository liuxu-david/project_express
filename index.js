const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 5000;
app.listen(port, () => {
  console.log(`该项目运行在${port}端口上`);
});

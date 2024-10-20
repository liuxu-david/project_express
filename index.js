const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { handleUpload } = require("./api_handle/upload");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const upload = multer({ dest: "./uploadsFiles" });

app.get("/", function (req, res) {
  res.send("hello");
});
app.post("/upload", upload.single("file"), handleUpload);

const port = 5000;
app.listen(port, () => {
  console.log(`该项目运行在${port}端口上`);
});

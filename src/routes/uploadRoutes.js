const express = require("express");
const multer = require("multer");
const uploadController = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ dest: "../../uploadsFiles" }); //设置存放目录

router.post("/verify", uploadController.handleVerify);
router.post("/upload", upload.single("file"), uploadController.handleUpload);
router.post("/merge", uploadController.handleMerge);

module.exports = router;

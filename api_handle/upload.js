const path = require("path");
const fs = require("fs");
exports.handleUpload = (req, res) => {
  const { fileHash, chunkIndex } = req.body;
  // 根据hash值创建文件夹
  // 如果文件不存在则新建文件夹将切片移入进去
  // 如果存在文件且有切片则将上传的切片删除即可
  const dirPath = path.resolve("uploadsFiles", fileHash); //文件夹绝对路径
  const chunkPath = path.join(dirPath, chunkIndex); //切片路径
  const tempPath = req.file.path; //临时文件路径
  console.log(dirPath, tempPath);
  // 判断是否有文件夹
  if (!fs.existsSync(dirPath)) {
    console.log("走这里了");
    fs.mkdirSync(dirPath, { recursive: true });
  }
  // 判断是否有切片文件
  if (!fs.existsSync(chunkPath)) {
    fs.renameSync(tempPath, chunkPath); //移动临时文件到目标目录
  } else {
    fs.unlinkSync(tempPath); //删除临时文件
  }

  res.send("hello");
};

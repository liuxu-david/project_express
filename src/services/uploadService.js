const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const { mergChunks } = require("../utils/mergeChunks");

// 文件检验接口
exports.verifyFile = async (fileName, fileHash) => {
  const tempFileHash = path.resolve("uploadsFiles", fileHash);
  const tempFileName = path.resolve("uploadsFiles", fileName);
  if (fs.existsSync(tempFileName)) {
    return { code: 201, msg: "该文件已上传", data: [] };
  }
  // 如果有hash文件夹判断已上传了多少片，没有就返回没有全部上传
  if (fs.existsSync(tempFileHash)) {
    const chunkPaths = fse.readdirSync(tempFileHash);
    return { code: 206, msg: "该文件还剩部分分片未上传", data: chunkPaths };
  } else {
    return { code: 404, msg: "该文件还未上传", data: [] };
  }
};
// 文件上传接口
exports.uploadChunk = async (fileHash, chunkIndex, tempPath) => {
  // 根据hash值创建文件夹
  // 如果文件不存在则新建文件夹将切片移入进去
  // 如果存在文件且有切片则将上传的切片删除即可
  const dirPath = path.resolve("uploadsFiles", fileHash); //当前hash地址文件夹绝对路径
  const chunkPath = path.join(dirPath, chunkIndex); //切片路径
  try {
    // 判断是否有文件夹
    if (!fs.existsSync(dirPath)) {
      console.log("走这里了");
      fs.mkdirSync(dirPath, { recursive: true });
    }
    console.log("chunkPath", chunkPath);

    // 判断是否有切片文件
    if (!fs.existsSync(chunkPath)) {
      fs.renameSync(tempPath, chunkPath); //移动临时文件到目标目录
    }
    // else {
    //   fs.unlinkSync(tempPath); //删除临时文件
    // }
    return { code: 200, msg: "Success", data: true };
  } catch (error) {
    return { code: 500, msg: "Upload failed", data: false };
  }
};
// 文件合并接口
exports.mergeChunks = async (chunkHash, fileName, chunksNumber) => {
  const dirPath = path.resolve("uploadsFiles", chunkHash); //目标目录
  const finallyPath = path.resolve("uploadsFiles", fileName);
  try {
    await mergChunks(dirPath, finallyPath, chunksNumber);
    return { code: 200, msg: "合并成功", success: true };
  } catch (error) {
    return { code: 500, msg: "Merge failed", success: false };
  }
};

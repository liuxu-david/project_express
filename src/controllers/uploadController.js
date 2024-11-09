const uploadService = require("../services/uploadService");

// 处理检查分片
exports.handleVerify = async (req, res) => {
  const { fileName, fileHash } = req.body;
  const result = await uploadService.verifyFile(fileName, fileHash);
  console.log(result);

  res.send(result);
};

// 处理上传
exports.handleUpload = async (req, res) => {
  const { fileHash, chunkIndex } = req.body;
  const tempPath = req.file.path; //临时文件路径
  const result = await uploadService.uploadChunk(
    fileHash,
    chunkIndex,
    tempPath
  );
  res.send(result);
};

// 处理合并
exports.handleMerge = async (req, res) => {
  const { chunkHash, fileName, chunksNumber } = req.body;
  const result = await uploadService.mergeChunks(
    chunkHash,
    fileName,
    chunksNumber
  );
  res.send(result);
};

const uploadService = require("../services/uploadService");
exports.handleVerify = async (req, res) => {
  const { fileName, fileHash } = req.body;
  const result = await uploadService.verifyFile(fileName, fileHash);
  res.status(result.code).send(result);
};
exports.handleUpload = async (req, res) => {
  const { fileHash, chunkIndex } = req.body;
  const tempPath = req.file.path; //临时文件路径
  const result = await uploadService.uploadChunk(
    fileHash,
    chunkIndex,
    tempPath
  );
  res.status(result.code).send(result);
};

exports.handleMerge = async (req, res) => {
  const { chunkHash, fileName, chunksNumber } = req.body;
  const result = await uploadService.mergeChunks(
    chunkHash,
    fileName,
    chunksNumber
  );
  res.status(result.code).send(result);
};

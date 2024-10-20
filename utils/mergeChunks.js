const path = require("path");
const fse = require("fs-extra");

exports.mergChunks = async function (dirPath, finallyPath, chunksNumber) {
  // 读取文件夹，获取所有切片
  const chunkPaths = fse.readdirSync(dirPath);
  console.log("chunkPaths：", chunkPaths);
  if (chunkPaths.length === chunksNumber) {
    // 验证成功后将切片追加到文件中
    let mergeTasks = [];
    for (let index = 0; index < chunkPaths.length; index++) {
      mergeTasks.push(
        new Promise((resolve) => {
          // 当前遍历的切片路径
          const chunkPath = path.resolve(dirPath, index + "");
          // 将当前遍历的切片切片追加到文件中
          fse.appendFileSync(finallyPath, fse.readFileSync(chunkPath));
          // 删除当前遍历的切片
          fse.unlinkSync(chunkPath);
          resolve();
        })
      );
    }
    await Promise.all(mergeTasks);
    fse.removeSync(dirPath);
  }
};

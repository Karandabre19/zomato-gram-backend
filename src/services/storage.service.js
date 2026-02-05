const imageKit = require("../config/imagekit")

async function uploadFile(file , fileName) {
    const result = await imageKit.upload({
      file: file, // required
      fileName: fileName, // required
    });

    return result;
}

module.exports = {
  uploadFile,
};
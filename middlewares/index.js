const util = require("util");
const path = require("path");
const { Image } = require("../models");

const uploadImage = async (req, res, next) => {
  let uploadPath = `${__dirname}/../public/images/%s%s`;

  if (!req.imageId) return;

  if (Object.keys(req.files).length > 0) {
    const extension = path.extname(req.files.image.name);
    uploadPath = util.format(uploadPath, req.imageId, extension);

    return await req.files.image.mv(uploadPath).then(async () => {
      await Image.update({ extension }, { where: { id: Number(req.imageId) } });
    });
  }
};

module.exports = { uploadImage };

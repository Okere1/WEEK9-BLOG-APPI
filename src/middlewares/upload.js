const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const CloudinaryStorage =
  require("multer-storage-cloudinary").CloudinaryStorage;

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "user-uploads", allowed_formats: ["jpg", "png"] },
});

const upload = multer({
  storage,
});

module.exports = upload;

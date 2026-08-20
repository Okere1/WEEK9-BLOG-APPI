const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const CloudinaryStorage =
  require("multer-storage-cloudinary").CloudinaryStorage;

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user-uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,

  // Strict 3 MB maximum per file
  limits: {
    fileSize: MAX_FILE_SIZE,
  },

  fileFilter,
});

module.exports = upload;

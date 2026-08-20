// Handle Error Globally
const errorHandler = (err, req, res, next) => {
  console.error(err.message | "");
  console.error(err.stack);
  const status = err.status || 500;

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File size must not exceed 3 MB.",
      });
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "You can upload a maximum of 5 images per post.",
      });
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "Invalid file type or too many files.",
      });
    }
  }

  return res.status(status).json({ error: err.message });
};

module.exports = errorHandler;

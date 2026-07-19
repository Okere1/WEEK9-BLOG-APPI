// Handle Error Globally
const errorHandler = (err, req, res, next) => {
  console.error(err.message | "");
  console.error(err.stack);
  const status = err.status || 500;

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(status).json({ error: err.message });
};

module.exports = errorHandler;

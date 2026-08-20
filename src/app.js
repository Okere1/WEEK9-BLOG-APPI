const express = require("express");
const multer = require("multer");
const cors = require("cors");
const RequestLogger = require("./middlewares/requestLogger");
const errorHandler = require("./middlewares/errorHandler");
const UserRoutes = require("./routes/user.route");
const ArticleRoutes = require("./routes/article.route");
const upload = require("./middlewares/upload");
const env = require("./config/env");

const app = express();

app.use(express.json());
app.use(cors("*"));
app.use(RequestLogger);

app.get("/api/v1/health", (req, res, next) => {
  return res.status(200).json({
    message: "Blog Application API is running",
    data: {
      status: "OK",
      version: "v1",
      port: env.PORT,
    },
  });
});

app.use("/api", ArticleRoutes);
app.use("/api/users", UserRoutes);

// CREATING AND SAVING THE FILE LOCALLY
// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 2 * 1024 * 1024 },
// });

app.post("/upload", upload.array("images", 5), (req, res) => {
  console.log("Body data:", req.body);
  console.log("Files:", req.files);

  res.status(200).json({
    message: "Upload successful",
    files: req.files,
  });
});
app.use(errorHandler);

module.exports = app;

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const RequestLogger = require("./middlewares/requestLogger");
const errorHandler = require("./middlewares/errorHandler");
const ArticleRoutes = require("./routes/article.route");
const UserRoutes = require("./routes/user.route");
const upload = require("./middlewares/upload");

const app = express();

app.use(express.json());
app.use(cors("*"));
app.use(RequestLogger);

app.use("/api", ArticleRoutes);
app.use("/api/users", UserRoutes);

// CREATING AND SAVING THE FILE LOCALLY
// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 2 * 1024 * 1024 },
// });

app.post("/upload", upload.single("file", 2), (req, res) => {
  console.log("Body data: ", req.body);
  console.log("File data: ", req.files);
  console.log("File Name :", req.file.filename);
  console.log("File URL :", req.file.path);
  res.send("Upload endpoint");
});

app.use(errorHandler);

module.exports = app;

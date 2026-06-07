require("dotenv").config();
const express = require("express");
const cors = require("cors");
const RequestLogger = require("./middlewares/requestLogger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(cors("*"));
app.use(RequestLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

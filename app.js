require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectDB");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors("*"));

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

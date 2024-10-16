const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const uploadProfile = require("./routes/uploadProfile");
const deleteProfile = require("./routes/deleteProfile");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/", studentRoutes);
app.use("/uploadProfile", uploadProfile);
app.use("/deleteProfile", deleteProfile);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database Connected!");
  })
  .catch(() => {
    console.log("Connection Faild!");
  });

app.listen(process.env.PORT, () => {
  console.log("Surver Running on PORT:" + process.env.PORT);
});

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const checkLogin = require("../app/middlewares/checkLogin");
const studentShecma = require("../app/Schema/studentSchema");
const Student = new mongoose.model("Student", studentShecma);
const multer = require("multer");
const router = express.Router();

const UPLOAD_FOLDER = "./upload";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 },
});

router.post("/", checkLogin, upload.single("profile"), async (req, res) => {
  try {
    const updateData = {
      profile: req.file.path,
    };

    let filter = { _id: req.user.userId };
    result = await Student.findOneAndUpdate(filter, updateData);
    res.send("Profile Picture Updated Success!");
  } catch (error) {
    res.send("There was a upload Error!");
  }
});

module.exports = router;

const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const checkLogin = require("../app/middlewares/checkLogin");
const studentShecma = require("../app/Schema/studentSchema");
const router = express.Router();

const Student = new mongoose.model("Student", studentShecma);

router.delete("/", checkLogin, async (req, res) => {
  try {
    let stduntData = await Student.find({ _id: req.user.userId });

    fs.unlinkSync(`./${stduntData[0].profile}`);
    await Student.updateOne({ _id: req.user.userId }, { profile: "null" });

    res.send("Delete Success!");
  } catch (error) {
    res.send("Delete Faild!");
  }
});

module.exports = router;

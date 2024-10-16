const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const checkLogin = require("../app/middlewares/checkLogin");
const studentShecma = require("../app/Schema/studentSchema");

const Student = new mongoose.model("Student", studentShecma);
// SIGN UP Student
router.post("/api/signup", async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const newStudent = new Student({
    fullName: req.body.fullName,
    userName: req.body.userName,
    password: hashedPass,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
  });

  try {
    await newStudent.save();
    res.status(200).json({
      error: "Student Registration Success!",
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
});

// SIGN IN Student
router.post("/api/signin", async (req, res) => {
  const student = await Student.find({ userName: req.body.userName });
  try {
    if (student && student.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        student[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            userName: student[0].userName,
            userId: student[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        // Set Cookie
        res.cookie("rememberme", token, {
          expires: new Date(Date.now() + 604800000),
          httpOnly: true,
          secure: true,
        });

        res.status(200).json({
          Access_Token: token,
          message: "Login Success!",
        });
      } else {
        res.status(401).send("Authication Faild!");
      }
    } else {
      res.status(401).send("Authication Faild!");
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Side Problem!",
    });
  }
});

// Read Student Profile
router.get("/api/profile", checkLogin, async (req, res) => {
  const student = await Student.findById(req.user.userId).exec();
  res.status(200).json({
    fullName: student.fullName,
    userName: student.userName,
    EmailAdderss: student.emailAddress,
    PhoneNumber: student.phoneNumber,
  });
});

// Update Student Profile
router.put("/api/update-profile", checkLogin, async (req, res) => {
  const updateData = {
    fullName: req.body.fullName,
    emailAddress: req.body.emailAddress,
    PhoneNumber: req.body.PhoneNumber,
  };

  let filter = { _id: req.user.userId };
  result = await Student.findOneAndUpdate(filter, updateData);

  res.status(200).json({
    Message: "Data Updated Success!",
    Result: result,
  });
});

// Log Out Student
router.delete("/api/logout", (req, res) => {
  res.clearCookie("rememberme");
  res.send("Logout Success!");
});

module.exports = router;

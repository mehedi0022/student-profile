const mongoose = require("mongoose");

const studentShecma = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
  },
  { timestamp: true }
);

module.exports = studentShecma;

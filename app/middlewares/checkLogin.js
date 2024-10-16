const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  let cookie = Object.keys(req.cookies).length >= 0 ? req.cookies : null;
  if (cookie) {
    try {
      const token = cookie["rememberme"];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      next("Please login Filrst!");
    }
  } else {
    next("Please login Filrst!");
  }
};

module.exports = checkLogin;

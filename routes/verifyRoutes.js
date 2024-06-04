const jwt = require("jsonwebtoken");
require("dotenv").config();
// function to verifyToken
function verifyToken(req, res, next) {
    // request a header's authorization field valur
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  // get token from headers (split method to use token)
  const token = authHeader.split(" ")[1];
  // if there is no token return res as Access denied
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("token" + {decoded.userId});
    // req.userId = decoded.userId;

    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({ err: error });
  }
}

module.exports = verifyToken;

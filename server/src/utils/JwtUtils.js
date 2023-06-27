const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign(
    { user: user },
    process.env.JWT_ACCESS_KEY || JWT_ACCESS_KEY,
    { expiresIn: "10m" }
  );
};

// Verify JWT and check if it has expired
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    console.log(decoded);
    // The token is valid
    // The decoded object contains the decoded payload
    return true;
  } catch (error) {
    console.error("Failed to verify JWT:", error.message);
    // The token is invalid or has expired
    return false;
  }
};

module.exports = {
  verifyToken,
  newToken,
};

const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7 days',
  });

  console.log('generated token:', token);
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.userId;
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };

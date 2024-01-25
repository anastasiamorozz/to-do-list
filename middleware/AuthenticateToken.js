require("dotenv").config();
const jwt = require('jsonwebtoken');

// Приклад middleware для обробки токенів
module.exports.authenticateToken = (req, res, next) => {
  // Отримання токена з заголовку Authorization
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Розшифрування та верифікація токена
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // Передача id користувача у req для подальшого використання
    req.user = decoded;

    // Продовження обробки запиту
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};
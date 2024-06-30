// middleware/auth.js
import jwt from 'jsonwebtoken';

const verifyToken = (handler) => (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return handler(req, res);
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export default verifyToken;

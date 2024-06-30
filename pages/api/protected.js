// pages/api/protected.js
import verifyToken from '../../middleware/auth';

const handler = (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
};

export default verifyToken(handler);

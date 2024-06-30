import { authenticateToken } from '../../lib/auth';

export default function handler(req, res) {
  authenticateToken(req, res, () => {
    res.status(200).json({ message: 'This is a protected route' });
  });
}

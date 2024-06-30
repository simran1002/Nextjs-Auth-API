// pages/api/auth/register.js
import connectDB from '../../../middleware/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default connectDB(handler);

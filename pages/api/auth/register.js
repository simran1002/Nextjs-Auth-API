import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectToDatabase();
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({ message: 'User created' });
    } catch (error) {
      res.status(400).json({ error: 'User already exists' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

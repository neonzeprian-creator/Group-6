import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../models/userModel.js';
import { generateToken } from '../utils/jwt.js';

// Removed in-memory user storage

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    if (await findUserByEmail(email)) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);
    return res.status(201).json({ success: true, message: 'User registered successfully', user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    delete user.password;
    return res.status(200).json({ success: true, message: 'Login successful', token, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const me = (req, res) => {
  res.status(200).json({ user: req.user });
};

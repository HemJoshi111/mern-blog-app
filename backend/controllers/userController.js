import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Helper function to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400); // Bad Request
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password, // Password will be hashed by the 'pre-save' middleware
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    // --- FIX ---
    // The previous code sent a 200 status by default.
    // This now sends a 400 or 500 status from within the catch block,
    // which correctly triggers the frontend's 'catch' block.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({ message: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401); // Unauthorized
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    // --- FIX ---
    // Also applied the status code fix here.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  // req.user is attached by the 'protect' middleware
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

export { registerUser, loginUser, getMe };

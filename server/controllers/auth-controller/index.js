const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require ("jsonwebtoken");
const validator = require("validator");
const dotenv = require('dotenv');
dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { name, age, number, email, password } = req.body;


    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }


    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, age, number, email, password: hashedPassword });
 
    // Save the new user
    await newUser.save();
    
    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ success: false, message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Incorrect password' });
      }

      const token = jwt.sign({ id: user._id,name:user?.name, email: user.email, role:user.role  }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({
          success: true,
          message: 'Login successful',
          token,
          user: { id: user._id, email: user.email, role:user.role, name:user?.name }
      });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };

import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!!!" });
    const newUser = await User.create({ name, email, password, role });
    const token = generateToken(newUser._id);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    };
    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      message: "User registered successfully!!!",
      success: true,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error: Could not register user." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Incorrect email or password" });
    const matched = await bcrypt.compare(password, user.password);
    if (!matched)
      return res.status(401).json({ message: "Incorrect email or password" });
    const token = generateToken(user._id);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      message: "User logged in successfully!!!",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error: Could not log in user." });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getUserProfile = (req, res) => {
  if (req.user) res.status(200).json(req.user);
  else res.status(404).json({ message: "User not found" });
};

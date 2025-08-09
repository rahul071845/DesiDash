import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) res.status(401).json({ message: "Not authorized, no token" });
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch(err){
    console.error(err);
      res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWTTOKEN, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODEENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user email or password");
  }
});
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully!" });
});
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});
const deleteUsers = asyncHandler(async (req, res) => {
  res.send("delete users");
});
const updateUsers = asyncHandler(async (req, res) => {
  res.send("update users");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  updateUserProfile,
  updateUsers,
  deleteUsers,
  getUsers,
};

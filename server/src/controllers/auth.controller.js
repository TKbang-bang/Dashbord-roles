const { User } = require("../../models");
const { createAccessToken, createRefreshToken } = require("../utils/token");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ where: { email } });
    if (user) return res.status(409).json({ message: "User already exists" });

    // creating user
    await User.create({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      role: "viewer",
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("POST /auth/signup => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signupPlus = async (req, res) => {
  try {
    const { firstName, lastName, email, password, code } = req.body;
    let role = "";

    // check if user exists
    const user = await User.findOne({ where: { email } });
    if (user) return res.status(409).json({ message: "User already exists" });

    // code verification
    if (
      code !== `${process.env.ADMIN_CODE}` &&
      code !== `${process.env.MODERATOR_CODE}`
    )
      return res.status(400).json({ message: "Invalid code" });
    if (code === `${process.env.ADMIN_CODE}`) role = "admin";
    if (code === `${process.env.MODERATOR_CODE}`) role = "moderator";

    // creating user
    await User.create({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      role,
    });

    return res
      .status(201)
      .json({ message: `User ${role} created successfully` });
  } catch (error) {
    console.log("POST /auth/signup/plus => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    // user credentials from client
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // password verification
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Password is incorrect" });

    // token management
    const accessToken = createAccessToken(user.user_id);
    const refreshToken = createRefreshToken(user.user_id);

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({ accessToken });
  } catch (error) {
    console.log("POST /auth/signin => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, signin, signupPlus };

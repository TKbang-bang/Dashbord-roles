const { User } = require("../../models");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

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

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log({ email, password });

    return res.status(200).json({ message: "Signin successful" });
  } catch (error) {
    console.log("POST /auth/signin => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, signin };

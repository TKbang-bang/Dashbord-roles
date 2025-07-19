const signupVerification = (req, res, next) => {
  // user credentials from client
  const { firstName, lastName, email, password } = req.body;

  // all fields verification
  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ message: "Please fill all fields" });

  // name verification
  if (firstName.length < 3 || lastName.length < 3)
    return res
      .status(400)
      .json({ message: "Name must be at least 3 characters" });
  if (firstName.endsWith(" ")) firstName = firstName.trim();
  if (lastName.endsWith(" ")) lastName = lastName.trim();

  // email verification
  if (!email.includes("@") || !email.includes("."))
    return res.status(400).json({ message: "Invalid email" });
  if (email.endsWith(" ")) email = email.trim();

  // password verification
  if (password.length < 6 || password.length > 12)
    return res
      .status(400)
      .json({ message: "Password must be between 6 and 12 characters" });
  if (password.endsWith(" ")) password = password.trim();

  return next();
};

const signinVerification = (req, res, next) => {
  // user credentials from client
  const { email, password } = req.body;

  // all fields verification
  if (!email || !password)
    return res.status(400).json({ message: "Please fill all fields" });

  // email verification
  if (!email.includes("@") || !email.includes("."))
    return res.status(400).json({ message: "Invalid email" });
  if (email.endsWith(" ")) email = email.trim();

  // password verification
  if (password.length < 6 || password.length > 12)
    return res
      .status(400)
      .json({ message: "Password must be between 6 and 12 characters" });
  if (password.endsWith(" ")) password = password.trim();

  return next();
};

module.exports = { signupVerification, signinVerification };

const { Router } = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const {
  signupVerification,
  signinVerification,
} = require("../middlewares/auth.verification");

const authRouter = Router();

authRouter.post("/signup", signupVerification, signup);
authRouter.post("/signin", signinVerification, signin);

module.exports = authRouter;

const { Router } = require("express");
const authRouter = require("./auth.router");
const protectedRouter = require("./protected.router");

const router = Router();

router.use("/auth", authRouter);
router.use("/protected", protectedRouter);

module.exports = router;

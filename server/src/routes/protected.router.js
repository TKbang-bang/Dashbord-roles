const { Router } = require("express");
const { verify } = require("../controllers/protected.controller");
const { tokenValidation } = require("../middlewares/token.validation");
const { getUser } = require("../controllers/user.controller");
const protectedRouter = Router();

protectedRouter.get("/", tokenValidation, verify);
protectedRouter.get("/user", tokenValidation, getUser);

module.exports = protectedRouter;

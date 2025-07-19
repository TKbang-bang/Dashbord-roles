const { Router } = require("express");
const { main } = require("../controllers/protected.controller");
const { tokenValidation } = require("../middlewares/token.validation");
const protectedRouter = Router();

protectedRouter.get("/", tokenValidation, main);

module.exports = protectedRouter;

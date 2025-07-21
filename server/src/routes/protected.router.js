const { Router } = require("express");
const { verify } = require("../controllers/protected.controller");
const { tokenValidation } = require("../middlewares/token.validation");
const { getUser } = require("../controllers/user.controller");
const upload = require("../utils/multer");
const { createProduct } = require("../controllers/products.controller");
const protectedRouter = Router();

protectedRouter.get("/", tokenValidation, verify);
protectedRouter.get("/user", tokenValidation, getUser);

protectedRouter.post(
  "/products",
  tokenValidation,
  upload.single("file"),
  createProduct
);

module.exports = protectedRouter;

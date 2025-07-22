const { Router } = require("express");
const { verify } = require("../controllers/protected.controller");
const { tokenValidation } = require("../middlewares/token.validation");
const { getUser, logout } = require("../controllers/user.controller");
const upload = require("../utils/multer");
const {
  createProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/products.controller");
const protectedRouter = Router();

protectedRouter.get("/", tokenValidation, verify);
protectedRouter.get("/user", tokenValidation, getUser);
protectedRouter.delete("/logout", tokenValidation, logout);

// products
protectedRouter.post(
  "/products",
  tokenValidation,
  upload.single("file"),
  createProduct
);
protectedRouter.get("/products", tokenValidation, getProducts);
protectedRouter.delete("/products/:id", tokenValidation, deleteProduct);

module.exports = protectedRouter;

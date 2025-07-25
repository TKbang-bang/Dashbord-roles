const { Router } = require("express");
const { verify } = require("../controllers/protected.controller");
const { tokenValidation } = require("../middlewares/token.validation");
const {
  getUser,
  logout,
  getUsers,
  getAUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const upload = require("../utils/multer");
const {
  createProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/products.controller");
const { getLogs } = require("../controllers/logs.controller");

const protectedRouter = Router();

protectedRouter.get("/verify", tokenValidation, verify);
protectedRouter.get("/users", tokenValidation, getUser);
protectedRouter.get("/users/all", tokenValidation, getUsers);
protectedRouter.get("/users/one/:id", tokenValidation, getAUser);
protectedRouter.put("/users/:id", tokenValidation, updateUser);
protectedRouter.delete("/logout", tokenValidation, logout);
protectedRouter.delete("/users/:id", tokenValidation, deleteUser);

// products
protectedRouter.post(
  "/products",
  tokenValidation,
  upload.single("file"),
  createProduct
);
protectedRouter.get("/products", tokenValidation, getProducts);
protectedRouter.delete("/products/:id", tokenValidation, deleteProduct);

protectedRouter.get("/logs", tokenValidation, getLogs);

module.exports = protectedRouter;

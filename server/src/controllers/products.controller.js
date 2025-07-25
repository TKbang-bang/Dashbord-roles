const { sequelize, Product, User, AuditLog } = require("../../models");

const createProduct = async (req, res) => {
  try {
    // user file from client through multer and product name
    const { filename } = req.file;
    const { name } = req.body;

    // all fields validation
    if (!filename || !name)
      return res.status(400).json({ message: "Missing fields in the request" });

    // check if user exists
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // checking the user role
    if (user.role == "viewer")
      return res.status(403).json({ message: "You are not authorized" });

    // creating product
    await sequelize.transaction(async (transaction) => {
      const product = await Product.create(
        { name, path: filename },
        { transaction }
      );
      // creating audit log
      await AuditLog.create(
        {
          action: "Created a product",
          user_id: user.user_id,
          affected_id: `${product.product_id}`,
          table_affected: "Products",
        },
        { transaction }
      );
    });

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log("POST /protected/products => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    // getting the products from the database
    const products = await Product.findAll();

    return res.status(200).json(products);
  } catch (error) {
    console.log("GET /protected/products => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // getting the product id from params
    const { id } = req.params;

    // getting the user
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // checking the user role
    if (user.role == "viewer")
      return res.status(403).json({ message: "You are not authorized" });

    // getting the product
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // deleting the product
    await sequelize.transaction(async (transaction) => {
      // deleting product
      await product.destroy({ transaction });

      // creating audit log
      await AuditLog.create(
        {
          action: "Deleted a product",
          user_id: user.user_id,
          affected_id: `${product.product_id}`,
          table_affected: "Products",
        },
        { transaction }
      );
    });

    return res.status(204).end();
  } catch (error) {
    console.log("DELETE /protected/products => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createProduct, getProducts, deleteProduct };

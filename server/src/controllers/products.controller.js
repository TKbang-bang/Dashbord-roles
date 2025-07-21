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

module.exports = { createProduct };

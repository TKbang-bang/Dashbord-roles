const { User, sequelize, AuditLog } = require("../../models");
const { Op } = require("sequelize");

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.log("GET /protected/user => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAUser = async (req, res) => {
  try {
    // getting the user
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // checking the user role ADMIN
    if (user.role !== "admin")
      return res.status(403).json({ message: "You are not authorized" });

    // getting the user
    const aUser = await User.findByPk(req.params.id);
    if (!aUser) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(aUser);
  } catch (error) {
    console.log("GET /protected/user/:id => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    // getting the user
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // All users
    let users = [];

    // checking the user role ADMIN
    if (user.role === "admin")
      users = await User.findAll({
        where: {
          [Op.and]: [
            { role: { [Op.ne]: "admin" } },
            { user_id: { [Op.ne]: user.user_id } },
          ],
        },
      });

    // checking the user role MODERATOR
    if (user.role == "moderator")
      users = await User.findAll({
        where: {
          [Op.and]: [
            { role: { [Op.ne]: "admin" } },
            { role: { [Op.ne]: "moderator" } },
            { user_id: { [Op.ne]: user.user_id } },
          ],
        },
      });

    // checking the user role VIEWER
    if (user.role == "viewer") {
      users = [];
      return res.status(403).json({ message: "You are not authorized" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log("GET /protected/users => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    // clear cookies
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(204).end();
  } catch (error) {
    console.log("delete /protected/user => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    // getting data from client request
    const { id } = req.params;
    const { role } = req.body;

    // all fields validation
    if (!id || !role)
      return res.status(400).json({ message: "Missing fields in the request" });

    // role validation
    if (role != "moderator" && role != "viewer")
      return res
        .status(400)
        .json({ message: "Role must be moderator or viewer" });

    // getting the user
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // checking the user role ADMIN
    if (user.role !== "admin")
      return res.status(403).json({ message: "You are not authorized" });

    // updating the user
    await sequelize.transaction(async (transaction) => {
      // updating user
      await User.update({ role }, { where: { user_id: id }, transaction });

      // creating audit log
      await AuditLog.create(
        {
          action: "Updated a user",
          user_id: user.user_id,
          affected_id: `${id}`,
          table_affected: "Users",
        },
        { transaction }
      );
    });

    return res.status(204).end();
  } catch (error) {
    console.log("PUT /protected/user/:id => ", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    // getting the user
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // checking the user role ADMIN
    if (user.role !== "admin")
      return res.status(403).json({ message: "You are not authorized" });

    // getting the user
    const aUser = await User.findByPk(req.params.id);
    if (!aUser) return res.status(404).json({ message: "User not found" });

    // deleting the user
    await sequelize.transaction(async (transaction) => {
      // deleting user
      await aUser.destroy({ transaction });

      // creating audit log
      await AuditLog.create(
        {
          action: "Deleted a user",
          user_id: user.user_id,
          affected_id: `${aUser.user_id}`,
          table_affected: "Users",
        },
        { transaction }
      );
    });

    return res.status(204).end();
  } catch (error) {
    console.log("DELETE /protected/users/:id => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUser,
  logout,
  getUsers,
  getAUser,
  updateUser,
  deleteUser,
};

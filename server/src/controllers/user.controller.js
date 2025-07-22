const { User } = require("../../models");
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
    if (user.role == "viewer")
      return res.status(403).json({ message: "You are not authorized" });

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
    });
    // clear headers
    res.removeHeader("access-token");

    return res.status(204).end();
  } catch (error) {
    console.log("delete /protected/user => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUser, logout, getUsers };

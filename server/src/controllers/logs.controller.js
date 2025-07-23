const { AuditLog, User } = require("../../models");

const getLogs = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "You are not authorized" });

    const logs = await AuditLog.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstname", "lastname", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(logs);
  } catch (error) {
    console.log("GET /protected/logs => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getLogs };

const { User } = require("../../models");

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

module.exports = { getUser };

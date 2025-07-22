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

module.exports = { getUser, logout };

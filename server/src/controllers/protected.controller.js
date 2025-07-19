const main = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    res.setHeader("access-token", `Bearer ${req.accessToken}`);

    return res.status(200).json({ message: "Protected route" });
  } catch (error) {
    console.log("GET /protected => ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { main };

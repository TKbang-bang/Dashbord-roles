const jwt = require("jsonwebtoken");
const { createAccessToken, createRefreshToken } = require("../utils/token");

// refresh token options
const refreshTokenOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

const tokenValidation = (req, res, next) => {
  // token from client
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;

  // token verification
  if (!accessToken && !refreshToken)
    return res.status(401).json({ message: "Unauthorized" });

  // if both tokens are present, verify access token first
  if (accessToken) {
    try {
      // verify access token
      const { userId } = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      // if access token is valid, set userId and proceed
      req.userId = userId;

      return next();
    } catch (error) {
      console.log("Invalid access token", error);
    }
  }

  // refresh token verification
  if (refreshToken) {
    try {
      // verify refresh token
      const { userId } = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // create new access and refresh tokens
      const newAccessToken = createAccessToken(userId);
      const newRefreshToken = createRefreshToken(userId);

      // set new tokens in response
      res.cookie("refreshToken", newRefreshToken, refreshTokenOptions);
      res.setHeader("access-token", `Bearer ${newAccessToken}`);
      req.userId = userId;

      return next();
    } catch (error) {
      console.log("Invalid refresh token", error);
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }
};

module.exports = { tokenValidation };

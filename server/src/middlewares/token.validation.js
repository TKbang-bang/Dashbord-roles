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

  // access token verification
  if (!accessToken) {
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    // refresh token verification
    try {
      const { userId } = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // create new access and refresh tokens
      const newAccessToken = createAccessToken(userId);
      const newRefreshToken = createRefreshToken(userId);

      // set new tokens
      res.cookie("refreshToken", newRefreshToken, refreshTokenOptions);

      // set access token
      res.setHeader("access-token", `Bearer ${newAccessToken}`);

      // set userId
      req.userId = userId;

      // next middleware
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }

  // if the access token is not null
  try {
    // verify access token
    const { userId: accessUserId } = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // if the access token is null or undefined
    if (!accessUserId) {
      // if the refresh token is null or undefined
      if (!refreshToken)
        return res.status(401).json({ message: "Unauthorized" });

      // refresh token verification
      try {
        const { userId } = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        // create new access and refresh tokens
        const newAccessToken = createAccessToken(userId);
        const newRefreshToken = createRefreshToken(userId);

        // set new tokens
        res.cookie("refreshToken", newRefreshToken, refreshTokenOptions);

        // set access token
        res.setHeader("access-token", `Bearer ${newAccessToken}`);

        // set userId
        req.userId = userId;

        // next middleware
        return next();
      } catch (error) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
    } else {
      // set userId
      req.userId = accessUserId;

      // next middleware
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};

module.exports = { tokenValidation };

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");
const path = require("path");

// creating express application
const app = express();

// setters
app.set("port", process.env.PORT);

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["access-token"],
  })
);
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
app.use(express.json());

// routes
app.use(router);

// server out
app.listen(app.get("port"), () =>
  console.log(`Server on port ${app.get("port")}`)
);

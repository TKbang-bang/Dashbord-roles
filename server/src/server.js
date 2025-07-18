require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");

// creating express application
const app = express();

// setters
app.set("port", process.env.PORT);

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use(router);

// server out
app.listen(app.get("port"), () =>
  console.log(`Server on port ${app.get("port")}`)
);

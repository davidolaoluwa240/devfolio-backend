// Modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookie = require("cookie-parser");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");

// Utils
const { requestLimit } = require("./utils");

// Express App
const app = express();

// Routers
const { authRouter, userRouter } = require("./routes");

// Middlewares
// Cross Origin Request Middleware
app.use(cors());
app.options("/api", cors());

// Logger Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Request Rate Limit
app.use(requestLimit(500, "Too many request, Please try again in an hour"));

// Security Header Middleware
app.use(helmet());

// Cookie Parser Middleware
app.use(cookie());

// Body Parser Middleware
app.use(express.json({ limit: "60kb" }));

// Cross Site Scripting Protection Middleware
app.use(xss());

// Mongodb Injection Protection Middleware
app.use(mongoSanitize());

// Serve Static Asset
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;

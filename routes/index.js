// Authentication Router
const authRouter = require("./authRoutes");

// User Router
const userRouter = require("./userRoutes");

// Re-Export Routers
module.exports = { authRouter, userRouter };

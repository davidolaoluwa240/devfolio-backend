// Modules
require("dotenv").config({ path: "./config.env" });

// Handle Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("ERROR 💥💥: unhandled rejection, shutting down");
  process.exit(1);
});

// App
const app = require("./app");

// DB
const connectDB = require("./db");

// Connect To Database
connectDB(() => {
  // Start Server
  const PORT = process.env.PORT;
  const server = app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
  });

  // Handle Unhandled Rejection
  process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("ERROR 💥💥: unhandled rejection, shutting down");
    server.close(() => {
      process.exist(1);
    });
  });
});

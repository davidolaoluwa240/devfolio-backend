// Modules
const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

// Portfolio Schema
const portfolioSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Portfolio name is required"],
    },
    template: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Portfolio must have a template"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Portfolio must belong to a user"],
    },
    slug: {
      type: String,
      unique: "Portfolio name {{VALUE}} already exist. Use another",
    },
  },
  { timestamps: true }
);

// Plugins
portfolioSchema.plugin(beautifyUnique);

// Portfolio Model
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;

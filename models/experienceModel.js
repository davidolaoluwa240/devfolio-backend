// Modules
const mongoose = require("mongoose");

// Experience Schema
const experienceSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Experience company name is required"],
    },
    role: {
      type: String,
      required: [true, "Experience role is required"],
    },
    year: {
      type: Number,
      required: [true, "Experience year is required"],
    },
    description: {
      type: String,
      required: [true, "Experience description is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Experience must belong to a user"],
    },
    portfolio: {
      type: mongoose.Schema.ObjectId,
      ref: "Portfolio",
      required: [true, "Experience must belong to a portfolio"],
    },
  },
  { timestamps: true }
);

// Experience Model
const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;

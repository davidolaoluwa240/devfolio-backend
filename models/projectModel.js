// Modules
const mongoose = require("mongoose");

// Project Schema
const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    link: { type: String, required: [true, "Project must have a live link"] },
    githubLink: {
      type: String,
      required: [true, "Project must have a github url"],
    },
    thumbnail: {
      url: { type: String, required: "Project must have a thumbnail" },
      cloundinaryId: String,
    },
    tags: [
      {
        type: String,
        required: [true, "Project must have a tag"],
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Project must belong to a user"],
    },
    portfolio: {
      type: mongoose.Schema.ObjectId,
      ref: "Portfolio",
      required: [true, "Project must belong to a portfolio"],
    },
  },
  { timestamps: true }
);

// Project Model
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

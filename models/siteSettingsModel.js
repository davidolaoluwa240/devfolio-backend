// Modules
const mongoose = require("mongoose");

// Site Settings Schema
const siteSettingsSchema = mongoose.Schema(
  {
    heroTitle: {
      type: String,
      required: [true, "Hero title is required"],
      maxLength: [60, "Hero title must not be greater than 60 characters"],
    },
    heroContent: {
      type: String,
      required: [true, "Hero content is required"],
      maxLength: [255, "Hero content must not be greater than 255 characters"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Site settings must belong to a user"],
    },
    portfolio: {
      type: mongoose.Schema.ObjectId,
      ref: "Porfolio",
      required: [true, "Site settings must belong to a portfolio"],
    },
  },
  { timestamps: true }
);

// Site Settings Model
const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

module.exports = SiteSettings;

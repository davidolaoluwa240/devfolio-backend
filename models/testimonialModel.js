// Modules
const mongoose = require("mongoose");

// Testimonial Schema
const testimonialSchema = mongoose.Schema(
  {
    quote: {
      type: String,
      required: [true, "Testimonial quote is required"],
    },
    authorName: {
      type: String,
      required: [true, "Testimonial name is required"],
    },
    authorDesignation: {
      type: String,
      required: [true, "Testimonial designation is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Testimonial must belong to a user"],
    },
    portfolio: {
      type: mongoose.Schema.ObjectId,
      ref: "Portfolio",
      required: [true, "Testimonial must belong to a portfolio"],
    },
  },
  { timestamps: true }
);

// Testimonial Model
const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;

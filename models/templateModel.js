// Modules
const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

// Template Schema
const templateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Template name is required"],
      unique:
        "Template with the name {{VALUE}} already exist. Use another name",
    },
    description: {
      type: String,
      required: [true, "Template description is required"],
    },
    thumbnail: {
      url: String,
      cloundinaryId: String,
    },
    downloadUrl: String,
  },
  { timestamps: true }
);

// Plugins
templateSchema.plugin(beautifyUnique);

// Template Model
const Template = mongoose.model("Template", templateSchema);

module.exports = Template;

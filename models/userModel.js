// Modules
const mongoose = require("mongoose");
const Validator = require("validator").default;
const beautifyUnique = require("mongoose-beautiful-unique-validation");

// User Schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      validate: [Validator.isEmail, "Enter a valid email eg demo@example.com"],
      trim: true,
      lowercase: true,
      unique: "User with the email {{VALUE}} already exist",
    },
    password: {
      type: String,
      minLength: [8, "User password must be atleast 8 characters"],
      required: [true, "User must have a password"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirm field is required"],
      validate: {
        validation: function (val) {
          return val === this.password;
        },
        message: "Password confirm must match password field",
      },
      select: false,
    },
    avatar: {
      url: String,
      cloudinaryId: string,
    },
    bio: {
      type: String,
      minLength: [20, "User bio must be atleast 20 characters"],
      maxLength: [600, "User bio must be less than or equal 600 characters"],
    },
    phone: String,
    skills: [String],
    resume: {
      url: String,
      cloudinaryId: String,
    },
    socials: {
      linkedinUrl: String,
      githubUrl: String,
      stackoverflowUrl: String,
      twitterUrl: String,
      youtubeUrl: String,
      dribbleUrl: String,
      facebookUrl: String,
      instagramUrl: String,
      twitchUrl: String,
      behanceUrl: String,
    },
    verificationToken: { type: String, select: false },
    verificationTokenExpires: { type: Date, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetTokenExpires: { type: Date, select: false },
    isVerified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Plugins
userSchema.plugin(beautifyUnique);

// User Model
const User = mongoose.model("User", userSchema);

module.exports = User;

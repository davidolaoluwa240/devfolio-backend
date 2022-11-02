// Modules
const crypto = require("crypto");
const mongoose = require("mongoose");
const Validator = require("validator").default;
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const bcrypt = require("bcryptjs");
const dateFnsAdd = require("date-fns/add");

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
    passwordChangedAt: Date,
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

// Middlewares
// Document Middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }
  next();
});

// Instance Methods
userSchema.methods.isPasswordCorrect = async function (comparePassword) {
  return await bcrypt.compare(comparePassword, this.password);
};

userSchema.methods.createVerificationToken = function () {
  const token = crypto.randomBytes(36).toString("hex");
  this.verificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.verificationTokenExpires = dateFnsAdd(Date.now(), {
    hours: process.env.VERIFICATION_TOKEN_EXPIRES,
  });
  this.active = false;
  return token;
};

// User Model
const User = mongoose.model("User", userSchema);

module.exports = User;

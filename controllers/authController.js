// Models
const { User } = require("../models");

// Utils
const {
  catchAsync,
  objectFilter,
  createAndSendJwtToken,
  AppError,
} = require("../utils");

/**
 * Signup User
 */
const signup = catchAsync(async (req, res, next) => {
  // 1). Exclude some fields from request body
  const newRequestBody = objectFilter(
    req.body,
    "verificationToken",
    "verificationTokenExpires",
    "passwordResetToken",
    "passwordResetTokenExpires",
    "isVerified",
    "active"
  );

  // 2. Create user
  const newUser = await User.create(newRequestBody);

  // 3. Create verification token on current user
  const verificationToken = user.createVerificationToken();

  //  4. Send user verification email

  //  5. Send user welcome email

  //  6. Create jwt token and send response
  await createAndSendJwtToken(newUser, res);
});

/**
 * Log User In
 */
const login = catchAsync(async (req, res, next) => {
  // 1). Get user
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  // 2). Throw an error if user do not exist and password is incorrect
  if (!user && !(await user.isPasswordCorrect(req.body.password))) {
    throw new AppError(401, "Email or password is not correct");
  }

  // 3. Create jwt token and send response
  await createAndSendJwtToken(user, res);
});

/**
 * Update Currently Authenticated User
 */
const updateMe = catchAsync(async (req, res, next) => {
  // 1). If request body contains any password field throw an error
  if (req.body.password || req.body.passwordConfirm) {
    throw new AppError(
      400,
      "This route is not for updating password. Please use '/auth/updateMyPassword'"
    );
  }

  // 2). Exclude some fields from request body
  const newRequestBody = objectFilter(
    req.body,
    "verificationToken",
    "verificationTokenExpires",
    "passwordResetToken",
    "passwordResetTokenExpires",
    "isVerified",
    "active"
  );

  // 3). Update user
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    newRequestBody,
    { new: true, runValidators: true }
  );

  // 4. Send response
  res.status(200).json({ status: "success", data: { user: updatedUser } });
});

module.exports = { signup, login, updateMe };

// Modules
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const dateFnsAdd = require("date-fns/add");

/**
 * Create Jwt Token And Send Response
 * @param {Object} user User object
 * @param {Object} res Express response object
 */
const createAndSendJwtToken = async (user, res) => {
  // 1). Generate jwt token
  const jwtToken = await promisify(jwt.sign)(
    { id: user._id },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRES,
    }
  );

  // 2). Add jwt token to cookie
  const cookieExpires = dateFnsAdd(Date.now(), {
    days: +String(process.env.JWT_TOKEN_EXPIRES).replace("d", ""),
  }).getTime();
  const cookieOption = {
    ...(process.env.NODE_ENV === "production" ? { secure: true } : {}),
    httpOnly: true,
    expires: cookieExpires,
  };
  res.cookie("jwt", jwtToken, cookieOption);

  // 3). Send response
  user.password = undefined;
  res.status(201).json({ status: "success", token: jwtToken, data: { user } });
};

module.exports = { createAndSendJwtToken };

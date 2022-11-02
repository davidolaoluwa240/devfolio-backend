// Modules
const path = require("path");
const nodemailer = require("nodemailer");
const { htmlToText } = require("html-to-text");
const pug = require("pug");

/**
 * Email Sender
 * @class
 */
class Email {
  /**
   * @constructor
   * @param {Object} user Current user
   * @param {Object} extra Other data
   */
  constructor(user, extra) {
    this.user = user;
    this.extra = extra;
    this.#createTransporter();
  }

  /**
   * Create Mailing Transporter
   * @private
   */
  #createTransporter() {
    // 1). Handle mail sending for development
    if (process.env.NODE_ENV === "development") {
      this.#transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      });
    }

    // 2). Handle mail sending for production
    if (process.env.NODE_ENV === "production") {
      this.#transporter = nodemailer.createTransport({});
    }
  }

  /**
   * Send Email To User
   * @param {string} template Template name
   * @param {string} subject Template subject
   * @private
   */
  async #sendMail(template, subject) {
    // 1). Compile pug template to html
    const emailHtml = pug.renderFile(
      path.join(__dirname, "..", "views", "emails", `${template}.pug`),
      { user, extra, subject }
    );

    // 2). Compile html to text
    const emailHtmlText = htmlToText(emailHtml);

    // 3). Send email
    await this.#transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: this.user.email,
      subject,
      text: emailHtmlText,
      html: emailHtml,
    });
  }

  /**
   * Send Welcome Email To User
   */
  async sendWelcomeEmail() {
    await this.#sendMail("welcomeEmail", "Welcome To DevFolio");
  }

  /**
   * Send Verification Email To User
   */
  async sendVerificationEmail() {
    await this.#sendMail(
      "verificationEmail",
      "Devfolio - Account Verification"
    );
  }

  /**
   * Send Forgot Password Email
   */
  async sendForgotPasswordEmail() {
    await this.#sendMail(
      "forgotPasswordEmail",
      "Devfolio - Reset Password Request"
    );
  }
}

module.exports = { Email };

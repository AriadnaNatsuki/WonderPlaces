
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/User.model");
const template = require("./mailtemplate");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "canamochaprojects@gmail.com",
    pass: "AyC18082012."
  }
})

module.exports.sendActivationMail = (email, token) => {
  transporter.sendMail({
    from: "canamochaprojects@gmail.com",
    to: email,
    subject: "Thanks for joining us",
    html: template.generateEmail(token)
  })
}
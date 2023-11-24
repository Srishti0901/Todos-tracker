const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const smtpTransport = require("nodemailer-smtp-transport");
const UserVerification = require("../models/userVerificationModel");

const sendEmail = async ({ _id, email }, res) => {
  try {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        port: 587,
        secure: true,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      })
    );

    const uniqueString = uuidv4() + _id;
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Verify your email",
      html: `<p>Verify for your email to complete signup process and login</p><p>Press the link to verify: <a href=${
        process.env.BASE_URL + "/verify/email/" + _id + "/" + uniqueString
      }>here</a> </p>`,
    };
    const hashedString = await bcrypt.hash(uniqueString, 10);
    await UserVerification.create({
      userId: _id,
      uniqueString: hashedString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    });
    await transporter.sendMail(mailOptions);
    console.log("Email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;

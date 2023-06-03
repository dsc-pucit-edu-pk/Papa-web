const Event = require("../models/Event");
const nodemailer = require("nodemailer");
const sendMail = async (email, subject, mail) => {
  console.log(process.env.EMAIL);
  console.log(process.env.EMAIL_PASSWORD);
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    var mailOptions = {
      from: `${process.env.EMAIL}`,
      to: email,
      subject: subject,
      text: mail,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

exports.sendMail = sendMail;

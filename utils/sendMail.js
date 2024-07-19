import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

//envs
const user = process.env.user;
const pass = process.env.pass;

//creating the transport
const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
});

//send mail function
const sendMail = async (email, verificationLink, subject, title) => {
  const html = `<div><p>${title}</p><a href=${verificationLink}>link</a></div>`;

  const mailOptions = {
    from: user,
    to: email,
    subject,
    html,
  };
  try {
    transport.sendMail(mailOptions);
    console.log("message sent successfully");
    return null;
  } catch (e) {
    console.log(e);
  }
};

export { sendMail };

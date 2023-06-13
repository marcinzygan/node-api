const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1 Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    logger: true,

    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  //2 Define email options
  const mailOptions = {
    from: 'Marcin Zygan <zygandesign@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3 Send email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

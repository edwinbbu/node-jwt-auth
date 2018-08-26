var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


function generateToken(id) {
  return jwt.sign({
    data: { id: id }
  }, 'secret', { expiresIn: '10days' });
};

function generateMail(email) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.mail,
      pass: process.env.mail_password
    }
  });

  var mailOptions = {
    from: 'edwinbbu@gmail.com',
    to: email,
    subject: 'Reset Your Password',
    text: 'OTP to reset password: '+Math.floor(100000 + Math.random() * 900000)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports.generateToken = generateToken;
module.exports.generateMail=generateMail;

var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

function generateToken(id,secret="secret") {
  return jwt.sign({
    data: { id: id }
  }, secret, { expiresIn: '10d' });
};

function verifyToken(token){
  let jwtToken=token;
        try {
            var decoded = jwt.verify(jwtToken, 'secret');
            console.log(decoded);
        } catch (e) {
            throw new Error("Error in token");
        }
        return decoded.data.id;
}

function generateMail(email) {
  var otp=Math.floor(100000 + Math.random() * 900000);
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
    text: 'OTP to reset password: '+otp
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return otp;
}

module.exports.generateToken = generateToken;
module.exports.verifyToken=verifyToken;
module.exports.generateMail=generateMail;

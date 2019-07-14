import nodemailer from 'nodemailer';
import 'dotenv/config';
import Util from '../utils/Utils';



const transporter = nodemailer.createTransport({
  host: process.env.service,
  port: 587,
  auth: {
    user: process.env.user,
    pass: process.env.password
  },
  tls: {
    secureProtocol: "TLSv1_method"
  }
});

const emailBody = (firstName, newPassword) => `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>New Password</title>
      <style type="text/css">
      body {
        padding: 0;
        margin: 0
      }
      .container {
        margin-top: 0;
        padding: 32px;
        color: #001a1a;
       
      }
      .message {
        padding: 32px
      }
      </style>
    </head>
    <body>
      <div class="container">
        <div>
          <p>Hi there ${firstName}!,</p><br>
          <div class="message">
            <p>Your new password is <strong><em>${newPassword}</em></strong></p>
            <p>
             Please ensure to change your password immediately after login
            </p>
            <br>
          </div>
          Thank you.
        </div>
    </div>
  </body>
  </html>
  `;
const sendMail = async (res, firstName, newPassword, email) => {


  const mailOptions = {
    from: 'noreply@property-prolite.com',
    to: email,
    subject: 'Password Reset - Property Pro Lite',
    html: emailBody(firstName, newPassword)
  };
  await transporter.sendMail(mailOptions, (error, body) => {
    if (error) {

      Util.setError('409', 'something went wrong, pls try again later')
      return Util.send(res);
    }
    if (body && !body.rejected.length) {

      Util.setSuccess(201, 'A new password has been sent to your email. Check your email and update your password');
      return Util.send(res);
    }

  })
};


export default sendMail;
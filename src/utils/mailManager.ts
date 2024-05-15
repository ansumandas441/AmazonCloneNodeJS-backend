import nodemailer from 'nodemailer';

import config from '../config.js';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'ansuman441@gmail.com',
    clientId: config.oAuthClientId,
    clientSecret: config.oAuthClientSecret,
    refreshToken: config.oAuthRefreshToken,
    accessToken: config.oAuthAccessToken,
  },
},
);

const mailManager = {
  sendMail: async (email: string, otp: string)=>{
    try {
            
      const mailOptions = {
        from: config.nodemailerEmail,
        to: email,
        subject: 'Nodemailer Project',
        text: `Please use the below OTP code: ${otp} to validate the request`,
      };
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error){
      console.log('Error sending mail', error);
    }
  },
};

export default mailManager;
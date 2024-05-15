import { Request, Response } from 'express';

import hashGenerator from '../../utils/hashGenerator.js';
import User from '../../models/userModel.js';
import otpManager from '../../utils/otpManager.js';
import fireStoreManager from '../../utils/fireStoreManager.js';
import mailManager from '../../utils/mailManager.js';

const registration = async (req: Request, res: Response): Promise<any> => {
  try {
    if(req.user!==null){
      return res.status(409).json({
        error: 'Conflict',
        message: 'User is already logged in',
      });
    }
    const {
      firstname,
      lastname,
      email,
      password,
    } = req.body;

    //check if users exists
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({
        message: 'User Already Exists. Please provide a new Email Address',
      });
    }
    //create hash of the password
    const hashedPassword = hashGenerator.generatePasswordHash(password);

    //check if the email belongs to the person 
    const totp = otpManager.generateOtp();
    const username = `${firstname.toLowerCase()}.${lastname.toLowerCase()}`;
    //send to firestore
    fireStoreManager.saveToOtp(email,username,hashedPassword,totp.tokenHash);
    //send the otp to mail and save the otp email id username and password in firestore
    mailManager.sendMail('ansuman.iitkgp.phy@gmail.com', totp.token);
    res.status(200).json({
      status:'success',
      message: 'OTP sent',
    });
        
  } catch (error: any) {
    console.error(`Registration error: ${error}`);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export default registration;


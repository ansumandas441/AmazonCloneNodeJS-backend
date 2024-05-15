import { Request, Response } from 'express';

import User from '../../models/userModel.js';
import session from '../../service/auth.js';
import config from '../../config.js';
import otpManager from '../../utils/otpManager.js';
import fireStoreManager from '../../utils/fireStoreManager.js';
import UserDocument from '../../shared/UserDocument.js';

const otpVerification = async (req: Request, res: Response) => {
  try {
    //fetch username otp email id from firestore
    if(req.user!==null){
      return res.status(409).json({
        error: 'Conflict',
        message: 'User is already logged in',
      });
    }
    const {
      email,
      otp,
    } = req.body;
        
    //fetch the otp from the database
    const emailOtp = await fireStoreManager.fetchOtp(email);
    // Check if this record exists and proceed
    if(!emailOtp || !emailOtp.exists){
      return res.status(401).json({status:'failed', message:'Sorry, the otp fetch error'});
    }
    //
    const username: string = emailOtp.data()?.username;
    const hashedPassword: string = emailOtp.data()?.hashedPassword;
    // Retrieve the expiry date
    const date: number = emailOtp.data()?.expiry;
    // Check if OTP has expired
    if(Date.now() > date){
      return res.json({status:'failed', message:'Sorry this otp has expired!'});
    }else{
      // Retrieve OTP code from database
      const hashToken:string = emailOtp.data()?.otp;
      // Compare OTP for match
      if(!otpManager.validateOtp(otp,hashToken)){
        return res.json({status:'failed', message:'Sorry, the otp provided is not valid'});
      }
    }
    // Successful login
    //create user
    const user: UserDocument  = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    //create user token
    const token = session.setSession(user);
    if (!token) {
      throw new Error('Token not found');
    }
    res.cookie('token', token, {
      ...config.loginCookieConfig,
    });
    res.status(201).json({
      message: 'User Registered Successfully ',
      username,
    });
    // return res.render("signup");
        
  } catch (error: any) {
    console.error(`Otp verification error: ${error}`);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export default otpVerification;
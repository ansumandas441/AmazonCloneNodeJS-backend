import { TOTP } from 'otpauth';

import hashGenerator from './hashGenerator.js';
import config from '../config.js';

const otpManager = {
  // Generate otp
  generateOtp: ()=>{
    //toptp object
    const totp = new TOTP({
      issuer: 'EcommerceNode',
      label: 'EcommerceApp',
      algorithm: 'SHA512',
      digits: 6,
      period: 60,
      secret: hashGenerator.generateNonSpecialRandomHash()+config.otpSalt, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")' HS(#DF&%)3@8HDF*H#@2@324#@34
    });
    const token = totp.generate();
    const hashedToken: string = hashGenerator.generateOtpHash(token);
    return {token:token, tokenHash:hashedToken};
  },

  // Validate otp
  validateOtp: (token: string, hashedToken: string)=>{
    return hashedToken===hashGenerator.generateOtpHash(token);
  },
};


export default otpManager;
const OTPAuth = require('otpauth');
const hashGenerator = require('./hashGenerator');
const config = require('../config');

const otpManager = {
  // Generate otp
  generateOtp: ()=>{
    //toptp object
    let totp = new OTPAuth.TOTP({
      issuer: "EcommerceNode",
      label: "EcommerceApp",
      algorithm: "SHA512",
      digits: 6,
      period: 60,
      secret: hashGenerator.generateNonSpecialRandomHash()+config.otpSalt, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")' HS(#DF&%)3@8HDF*H#@2@324#@34
    });
    let token = totp. generate();
    let hashedToken = hashGenerator.generateOtpHash(token);
    return {token:token, tokenHash:hashedToken};
  },

  // Validate otp
  validateOtp: (token, hashedToken)=>{
      return hashedToken===hashGenerator.generateOtpHash(token);
  }
}


module.exports = otpManager;
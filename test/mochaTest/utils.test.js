// After:
let chai;
let expect;
const hashGenerator = require('../../utils/hashGenerator');
const otpManager = require('../../utils/otpManager');

before(async () => {
    chai = await import('chai');
    expect = chai.expect;
  });

describe('hashGenerator', () => {
    it('should generate a non-special random hash', () => {
        const hash = hashGenerator.generateNonSpecialRandomHash();
        expect(hash).to.be.a('string');
        expect(hash).to.have.lengthOf(52); // Assuming base32 representation with 16 characters
    });

    it('should generate an OTP hash', () => {
        const value = '123456'; // Example value for testing
        const hash = hashGenerator.generateOtpHash(value);
        expect(hash).to.be.a('string');
        expect(hash).to.have.lengthOf(64);// Add more specific assertions if needed based on the expected behavior of generateOtpHash
    });

    it('should generate a password hash', () => {
        const value = 'password123'; // Example value for testing
        const hash = hashGenerator.generatePasswordHash(value);
        expect(hash).to.be.a('string');
        expect(hash).to.have.lengthOf(64); // Add more specific assertions if needed based on the expected behavior of generatePasswordHash
    });
});

describe('otpGenerator',()=>{
    it('should generate a 6 digit otp',()=>{
        const otp = otpManager.generateOtp();
        expect(otp.token).to.be.a('string');
        expect(otp.token).to.have.lengthOf(6);
        expect(otp.tokenHash).to.be.a('string');
        expect(otp.tokenHash).to.have.lengthOf(64);
    });
});

// const a = hashGenerator.generateOtpHash('123sadas456');
// console.log(a.length);
// const b = hashGenerator.generatePasswordHash('asdadasdasdasd');
// console.log(b.length);
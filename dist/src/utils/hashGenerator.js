import { randomBytes, createHash } from 'crypto';
import config from '../config';
//  function for generating hash-secret for otp
const hashGenerator = {
    generateNonSpecialRandomHash: () => {
        //generating random seed
        const seed = randomBytes(32);
        //generating hash from the random seed
        const hash = createHash('sha256').update(seed).digest();
        //Encode the hash into base32 representation
        const base32SecretKey = base32Encode(hash);
        return base32SecretKey;
    },
    generateOtpHash: (value) => {
        const data = config.otpHashSalt + value;
        return createHash('sha256').update(data).digest('hex');
    },
    generatePasswordHash: (value) => {
        const data = config.passwordHashSalt + value;
        return createHash('sha256').update(data).digest('hex');
    }
};
function base32Encode(buffer) {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = 0;
    let value = 0;
    let base32Str = '';
    for (let i = 0; i < buffer.length; i++) {
        value = (value << 8) | buffer[i];
        bits += 8;
        while (bits >= 5) {
            base32Str += base32Chars[(value >>> (bits - 5)) & 31];
            bits -= 5;
        }
    }
    if (bits > 0) {
        base32Str += base32Chars[(value << (5 - bits)) & 31];
    }
    return base32Str;
}
export default hashGenerator;

import expressRateLimit from 'express-rate-limit';

const limiter = expressRateLimit({
  windowMs: 15 * 60 * 10000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

export default limiter;
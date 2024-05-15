import dotenv from 'dotenv';
dotenv.config();

interface Config {
  environment: string,
  sslCertPath: string;
  connection_url: string;
  port: number;
  sslOptions: {
    ssl: boolean;
    tlsCertificateKeyFile: string;
  };
  loginCookieConfig: {
    maxAge: number;
  };
  stripeSecretKey: string;
  stripePublicKey: string;
  otpSalt: string;
  otpHashSalt: string;
  passwordHashSalt: string;
  oAuthClientId: string;
  oAuthClientSecret: string;
  oAuthRefreshToken: string;
  oAuthAccessToken: string;
  nodemailerEmail: string;
}

const config: Config = {
  environment: process.env.NODE_ENV || 'development',
  sslCertPath: process.env.SSL_CERT_PATH || '',
  connection_url:process.env.CONNECTION_URL?.replace('{DB_NAME}', 'amazondb1') || '',
  port:parseInt(process.env.PORT || '8888', 10),
  sslOptions: {
    ssl: true,
    tlsCertificateKeyFile: process.env.SSL_CERT_PATH || '',
  },
  loginCookieConfig: {
    // secure: true,
    // httpOnly: true,
    maxAge: 1800000, // 30 minutes
  },
  stripeSecretKey:process.env.STRIPE_SECRET_KEY || '',
  stripePublicKey:process.env.STRIPE_PUBLIC_KEY || '',
  otpSalt:process.env.SALT_FOR_OTP || '', 
  otpHashSalt:process.env.SALT_FOR_OTP_HASH_GENERATOR || '', 
  passwordHashSalt:process.env.SALT_FOR_PASSWORD_HASH_GENERATOR || '', 
  oAuthClientId: process.env.OAUTH_CLIENT_ID || '',
  oAuthClientSecret: process.env.OAUTH_CLIENT_SECRET || '',
  oAuthRefreshToken: process.env.OAUTH_REFRESH_TOKEN || '',
  oAuthAccessToken: process.env.OAUTH_ACCESS_TOKEN || '',
  nodemailerEmail: process.env.NODE_MAILER_EMAIL || '',
};

export default config;
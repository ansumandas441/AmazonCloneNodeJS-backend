import jwt from 'jsonwebtoken';

import UserDocument from '../shared/UserDocument.js';
const secret = 'NewSecret*()$';



const setSession = (user: UserDocument) => {
  if (!user) {
    return null;
  }
  try {
    return jwt.sign({
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret, {});
  } catch (error) {
    console.log('Error getting setSession', error);
    throw error;
  }
};

const getSession = (token: string) => {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log('Error getting getSession', error);
    throw error;
  }
};

export default {
  setSession,
  getSession,
};
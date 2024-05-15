import { Request, Response } from 'express';

import User from '../../models/userModel.js';
import session from '../../service/auth.js';
import config from '../../config.js';
import hashGenerator from '../../utils/hashGenerator.js';

const login = async (req: Request, res: Response) => {
  try {
    if(req.user!==null){
      return res.status(409).json({
        error: 'Conflict',
        message: 'User is already logged in',
      });
    }
    const {
      email,
      password,
    } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user || password===hashGenerator.generatePasswordHash(password)) {
      return res.status(400).json({
        message: 'Invalid Email or Password',
      });
    }
    // Successful login
    const token = session.setSession(user);
    if (!token) {
      console.log('Token not found');
      return res.status(401).json({
        error: 'Conflict',
        message: 'Internal Server Error',
      });
    }
    res.cookie('token', token, {
      ...config.loginCookieConfig,
    });
    res.status(200).json({
      message: 'Login successful.',
      username: user.username,
    });
  } catch (error: any) {
    console.error(`Login error: ${error}`);
    res.status(500).json({
      message: 'Internal Server Error',
      error,
    });
  }
};

export default login;
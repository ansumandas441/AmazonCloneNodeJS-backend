import { Request, Response } from 'express';


const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(300).json({
        message: 'Not loggedin.',
      });
    }
    res.clearCookie('token');
    res.status(200).json({
      message: 'Logout successful.',
    });
  } catch (error: any) {
    console.error(`Logout Error: ${error}`);
  }
};

export default logout;
import User from '../models/userModel.js';
import session from '../service/auth.js';
import config from '../config.js';
import otpManager from '../utils/otpManager.js';
import mailManager from '../utils/mailManager.js';
import fireStoreManager from '../utils/fireStoreManager.js';
import hashGenerator from '../utils/hashGenerator.js';
import { Request, Response } from 'express';
import UserDocument from '../shared/UserDocument.js';

const handleUserRegistration = async (req: Request, res: Response) => {
    try {
        if(req.user!==null){
            return res.status(409).json({
                error: "Conflict",
                message: "User is already logged in"
            });
        }
        const {
            firstname,
            lastname,
            email,
            password
        } = req.body;

        //check if users exists
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User Already Exists. Please provide a new Email Address"
            })
        }
        //create hash of the password
        const hashedPassword = hashGenerator.generatePasswordHash(password);

        //check if the email belongs to the person 
        const totp = otpManager.generateOtp();
        const username = `${firstname.toLowerCase()}.${lastname.toLowerCase()}`;
        //send to firestore
        fireStoreManager.saveToOtp(email,username,hashedPassword,totp.tokenHash);
        //send the otp to mail and save the otp email id username and password in firestore
        mailManager.sendMail('ansuman.iitkgp.phy@gmail.com', totp.token);
        res.status(200).json({
            status:'success',
            message: 'OTP sent'
        });
        
    } catch (error: any) {
        console.error(`Registration error: ${error}`);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const verifyOtp = async (req: Request, res: Response)=>{
    try {
        //fetch username otp email id from firestore
        if(req.user!==null){
            return res.status(409).json({
                error: "Conflict",
                message: "User is already logged in"
            });
        }
        const {
            email,
            otp
        } = req.body;
        
        //fetch the otp from the database
        const emailOtp = await fireStoreManager.fetchOtp(email);
        // Check if this record exists and proceed
        if(!emailOtp || !emailOtp.exists){
            return res.status(401).json({status:"failed", message:"Sorry, the otp fetch error"});
        }
        //
        const username: string = emailOtp.data()?.username;
        const hashedPassword: string = emailOtp.data()?.hashedPassword;
        // Retrieve the expiry date
        const date: number = emailOtp.data()?.expiry;
        // Check if OTP has expired
        if(Date.now() > date){
            return res.json({status:"failed", message:"Sorry this otp has expired!"});
        }else{
            // Retrieve OTP code from database
            const hashToken:string = emailOtp.data()?.otp;
            // Compare OTP for match
            if(!otpManager.validateOtp(otp,hashToken)){
                return res.json({status:"failed", message:"Sorry, the otp provided is not valid"});
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
            throw new Error("Token not found");
        }
        res.cookie("token", token, {
            ...config.loginCookieConfig
        });
        res.status(201).json({
            message: 'User Registered Successfully ',
            username
        });
        // return res.render("signup");
        
    } catch (error: any) {
        console.error(`Otp verification error: ${error}`);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const handleUserLogin = async (req: Request, res: Response) => {
    try {
        if(req.user!==null){
            return res.status(409).json({
                error: "Conflict",
                message: "User is already logged in"
            });
        }
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user || password==hashGenerator.generatePasswordHash(password)) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }
        // Successful login
        const token = session.setSession(user);
        if (!token) {
            console.log('Token not found');
            return res.status(401).json({
                error: "Conflict",
                message: "Internal Server Error"
            });
        }
        res.cookie("token", token, {
            ...config.loginCookieConfig
        });
        res.status(200).json({
            message: 'Login successful.',
            username: user.username
        });
    } catch (error: any) {
        console.error(`Login error: ${error}`);
        res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
}

const handleUserLogout = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(300).json({
                message: 'Not loggedin.'
            })
        }
        res.clearCookie('token');
        res.status(200).json({
            message: 'Logout successful.'
        });
    } catch (error: any) {
        console.error(`Logout Error: ${error}`);
    }
}

export default {
    handleUserRegistration,
    verifyOtp,
    handleUserLogin,
    handleUserLogout,
};
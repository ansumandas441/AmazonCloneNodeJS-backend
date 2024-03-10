const User = require('../models/userModel');
const {
    setSession,
    getSession
} = require('../service/auth');
const bcrypt = require('bcrypt');
const config = require('../config');

const handleUserRegistration = async (req, res) => {
    try {
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
        const username = `${firstname.toLowerCase()}.${lastname.toLowerCase()}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        // Successful login
        const token = setSession(user);
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
    } catch (error) {
        console.error(`Registration error: ${error}`);
        res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
}

const handleUserLogin = async (req, res) => {
    try {
        const existingSessionId = req.cookies.token;
        console.log("existingSessionId");
        console.log(existingSessionId);
        const existingUser = getSession(existingSessionId);
        if (existingSessionId && await User.find({
                user: existingUser.email
            })) {
            return res.status(201).json({
                message: "User Already Loggedin."
            });
        };
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        });
        // console.log({email});  
        // console.log({password});
        // console.log({user});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }
        // Successful login
        const token = setSession(user);
        if (!token) {
            const error = new Error("Token not found");
            error.code = 401;
            throw error;
        }
        res.cookie("token", token, {
            ...config.loginCookieConfig
        });
        res.status(200).json({
            message: 'Login successful.',
            username: user.username
        });
    } catch (error) {
        console.error(`Login error: ${error}`);
        res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
}

const handleUserLogout = async (req, res) => {
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
    } catch (error) {
        console.error(`Logout Error: ${error}`);
    }
}

const showLoginView = (req,res)=> {
    res.render('authView', {title: 'Auth View'});
}

module.exports = {
    handleUserRegistration,
    handleUserLogin,
    handleUserLogout,
    showLoginView,
};
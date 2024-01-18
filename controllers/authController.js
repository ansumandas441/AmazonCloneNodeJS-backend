const User = require('../models/userModel');
const {setSession, isSessionIdValid, deleteSession} = require('../service/auth');
const bcrypt = require('bcrypt');

const handleUserRegistration = async ( req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body; 
        
        //check if users exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "User Already Exists. Please provide a new Email Address"})
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
        res.cookie("token", token);
        return res.status(201).json({message: 'User Registered Successfully ', username});
        // return res.render("signup");
    } catch(error){
        console.error(`Registration error: ${error}`);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

const handleUserLogin = async (req,res)=>{
    try{
        const existingSessionId = req.cookies.token;
        console.log(existingSessionId);
        if (existingSessionId || isSessionIdValid(existingSessionId)) {
            return res.status(201).json({message: "User Already Loggedin."})
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        console.log({email});  
        console.log({password});
        console.log({user});
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({message: "Invalid Email or Password"})
        }
        // Successful login
        const token = setSession(user);
        res.cookie("token", token, {
            // secure: true,
            // httpOnly:true,
            maxAge:1800000, //safety measures
        });
        return res.status(200).json({ message: 'Login successful.', username: user.username });
    } catch (error) {
        console.error(`Registration error: ${error}`);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

const handleUserLogout = async (req,res)=>{
    try{
        const sessionId = req.cookies.token;
        if (!sessionId && !isSessionIdValid(sessionId)) {
            return res.status(300).json({message: 'Not loggedin.'})
        }
        deleteSession(sessionId);
        res.clearCookie('uid');
        return res.status(200).json({ message: 'Logout successful.'});
    } catch (error) {
        console.error(`Logout Error: ${error}`);
    }
}



module.exports = {
    handleUserRegistration,
    handleUserLogin,
    handleUserLogout,
};
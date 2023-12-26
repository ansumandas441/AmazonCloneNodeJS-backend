const User = require('../models/userModel');
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
        await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({message: 'User Registered Successfully ', username});
        // return res.render("signup");
    } catch(error){
        console.error(`Registration error: ${error}`);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

const handleUserLogin = async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        console.log({email});
        console.log({user});
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({message: "Invalid Email or Password"})
        }
        // Successful login
        return res.status(200).json({ message: 'Login successful.', username: user.username });
    } catch (error) {
        console.error(`Registration error: ${error}`);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {
    handleUserRegistration,
    handleUserLogin,
};
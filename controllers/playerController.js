const bcrypt = require('bcrypt');
const validator = require('validator');
const Sequelize = require('sequelize');
const User = require('../models/userModel');
const Player = require('../models/playerModel');
const { sendWelcomeEmail } = require('../services/mailers/playerWelcomeMail');
// const secretKey = process.env.JWT_KEY;

const registerPlayer = async (req,res) => {
    
    const { firstname, lastname, email, mobile, password } = req.body;

    if (!firstname || !validator.isAlpha(firstname, 'en-US', { ignore: ' ' })) {
        return res.status(400).json({ error: 'Invalid firstname' });
    }

    if (!lastname || !validator.isAlpha(lastname, 'en-US', { ignore: ' ' })) {
        return res.status(400).json({ error: 'Invalid lastname' });
    }

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (!mobile || !validator.isMobilePhone(mobile)) {
        return res.status(400).json({ error: 'Invalid mobile' });
    }

    if (!password) {
        throw new Error('Missing password.');
    }

    try {
        
        const emailUser = await User.findOne({ where: { email: email } });
        if (emailUser) {
            throw new Error('Email already exists.');
        }

        const mobileUser = await User.findOne({ where: { mobile: mobile } });
        if (mobileUser) {
            throw new Error('Mobile number already exists.');
        }
        const saltRounds = process.env.SALT_ROUNDS;
        const salt = await bcrypt.genSaltSync(parseInt(saltRounds));
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = { 
            mobile:mobile,
            email:email,
            password:hashedPassword, 
            role:"player"
        };
        
        const createdUser = await User.create(newUser);

        const newPlayer = {
            user_id:createdUser.id,
            first_name:firstname,
            last_name:lastname           
        }

        const createdPlayer = await Player.create(newPlayer);

        // need enable below mailer in production
        // await sendWelcomeEmail(email,firstname);

        res.status(201).json({ message: 'Player registered successfully', user: createdUser, player: createdPlayer });

    } catch (error) {
        console.error('Error registering player:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}


const updateProfile = async (req,res) => {
    const { id, } = req.params;
}



//to export all functions to the router
module.exports = {
    registerPlayer,
    updateProfile
};
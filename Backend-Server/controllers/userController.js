const User = require('../models/User.js');
const AuthService = require('../services/authService.js');

exports.registerUser = async (req, res) => {
    const {username, email, password, phoneNumber, profession} = req.body;
    console.log(req.body)
    try {
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({
                message: `User already exists`
            });
        }
        const hashedPassword = await AuthService.hashUserPassword(password);

        user = new User({
            username,
            email,
            password: hashedPassword,
            phoneNumber,
            profession
        });

        await user.save();

        const token = AuthService.generateAuthToken(user.id);
        return res.status(200).json({
            token: token
        })
    }
    catch (error){
        console.error(error.message);
        return res.status(500).json({message: `Server error could not register a user, please try again after sometime`});
    }
}

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: `Invalid credentials`});
        };

        const isMatch = await AuthService.compareUserpassword(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                message: `Invalid Password`
            })
        }

        const token = AuthService.generateAuthToken(user.id)
        return res.status(200).json({
            token: token,
            userId: user.id
        })
    }
    catch (err){
        console.error(err.message);
        return res.status(500).send({message: `Server error`});
    }
}

exports.fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            users: users
        })
    }
    catch (err){
        console.error(`Error fetching users`, err);
        return res.status(500).json({message: `Error fetching users`});
    }
}

exports.editExistingUser = async (req, res) => {
    const { username, phoneNumber } = req.body;

    try {
        await User.findByIdAndUpdate(req.params.id, (username, phoneNumber));
        return res.status(200).json({message: 'user Updated successfully'});
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
}

exports.deleteExistingUser =  async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: `User deleted Succesfully`});
    }
    catch (err){
        console.error(`Error deleting the User`, err);
        res.status(500).json({
            message: '`Error deleting user'
        });
    }
}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: '.config/.env'});
const TOKEN = process.env.JWT_TOKEN || 'Secret key'

class AuthService {
    static async hashUserPassword(password){
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    static async compareUserpassword(password, hashedPassword){
        return bcrypt.compare(password, hashedPassword);
    }

    static generateAuthToken(userId){
        const payload = {
            user: {
                id: userId
            }
        };
        return jwt.sign(payload, TOKEN, {expiresIn: '1hr'});
    }
};

module.exports = AuthService;
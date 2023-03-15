const jwt = require('jsonwebtoken');
const { passwordCompare } = require('../helpers/passwordHelper');
const UserModel = require('../models/userModel');

/**
 * 
 * @url https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs 
 */
class AuthenticationJwtService {

    async authenticate(email = '', password = ''){

        const model = await UserModel.findOne({
            raw: true,
            where: {'email': email},
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    
        if(!model){
            
            throw new Error('E-mail was not found');
        }
    
        if(!passwordCompare(password, model['password'])){
    
            throw new Error('E-mail or Password were wrong');
        }
    
        delete model['password'];

        return model;
    }

    generate(userId = 0) {

        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { 
            expiresIn: '24h' 
        });
    }

    verify(token = '') {

        return jwt.verify(token, process.env.JWT_SECRET);
    }

    expires(token = ''){

        return 1800;
    }

    static newInstance(){

        return new AuthenticationJwtService();
    }
}

module.exports = AuthenticationJwtService;
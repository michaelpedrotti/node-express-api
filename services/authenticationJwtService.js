const jwt = require('jsonwebtoken');

/**
 * 
 * @url https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs 
 */
class AuthenticationJwtService {

    generate(email = '') {

        return jwt.sign({email}, process.env.JWT_SECRET, { 
            expiresIn: '1800s' 
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
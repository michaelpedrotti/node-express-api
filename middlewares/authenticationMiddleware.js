const AuthenticationJwtService = require("../services/authenticationJwtService");

class AuthenticationMiddleware {

    static async isLogged(req, res, next) {

        const token = String(req.headers['authorization']).replace('Bearer ', '');
    
        try {

            if(AuthenticationJwtService.newInstance().verify(token)) {

                next();
            }
            else {

                res.status(403).json({error: true, message: 'Invalid token'});
            }
        }
        catch(err) {

            res.status(403).json({error: true, message: err.message});

            // console.error('AuthenticationMiddleware', err); AWS Cloud Watch
        }
    }

}

module.exports = AuthenticationMiddleware;
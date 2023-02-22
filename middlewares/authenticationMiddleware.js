const AuthenticationJwtService = require("../services/authenticationJwtService");

class AuthenticationMiddleware {

    static async isAuthenticated(req, res, next) {

        try {

            if(!req.headers['authorization']){

                throw new Error('No Authorization header was sent');
            }

            const token = String(req.headers['authorization']).replace('Bearer ', '');

            AuthenticationJwtService.newInstance().verify(token);
            next();
        }
        catch(err) {

            res.status(403).json({
                error: true, 
                message: err.message
            });
        }
    }

}

module.exports = AuthenticationMiddleware;
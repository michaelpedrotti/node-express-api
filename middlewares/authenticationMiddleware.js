const AuthenticationJwtService = require("../services/authenticationJwtService");

class AuthenticationMiddleware {

    static async isAuthenticated(req, res, next) {

        try {

            if(!req.headers['authorization']){

                throw new Error('No Authorization header was sent');
            }

            const token = String(req.headers['authorization']).replace('Bearer ', '');
            const payload = AuthenticationJwtService.newInstance().verify(token);

            res.locals.user = payload.id;

            next();
        }
        catch(err) {

            res.status(401).json({
                error: true, 
                message: err.message || 'Unauthorized'
            });
        }
    }

}

module.exports = AuthenticationMiddleware;
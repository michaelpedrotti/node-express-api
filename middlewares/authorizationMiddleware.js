const AuthorizationService = require("../services/authorizationService");

class AuthorizationMiddleware {

    static isAuthorized(resource = 'user', action = 'read') {

        return async(req, res, next) => {

            if(!AuthorizationService.newInstance().hasPermission(resource, action, res.locals.user)){

                res.status(403).json({
                    error: true, 
                    message: 'Forbidden'
                });
            }

            next();
        }; 
    }
}

module.exports = AuthorizationMiddleware;
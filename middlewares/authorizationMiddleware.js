class AuthorizationMiddleware {

    static isAuthorized(resource = 'user', action = 'read') {

        return async(req, res, next) => {

            next();
        }; 
    }
}

module.exports = AuthorizationMiddleware;
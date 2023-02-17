class AuthorizationMiddleware {


    static async isAllowed(req, res, next) {

        next();
    }

}

module.exports = AuthorizationMiddleware;
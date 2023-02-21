class ErrorHandlingMiddleware {

    static async register(err, req, res, next) {

        if (res.headersSent) {
            return next(err);
        }

        console.error(err.stack);

        res.status(err.httpCode || 500);
        res.json({ error: true, message: err.message });
    }
}

module.exports = ErrorHandlingMiddleware;
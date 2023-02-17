/**
 * Error Handling
 * 
 * @link https://expressjs.com/en/guide/error-handling.html
 */
 module.exports = function (app) {

    app.use(function(err, req, res, next) {
        
        if (res.headersSent) {
            return next(err);
        }

        console.error(err.stack);

        res.status(err.httpCode || 500);
        res.json({ error: true, message: err.message });
    });
}
const AuthenticationJwtService = require('../services/authenticationJwtService');

class AuthController {

    static async login(req, res) {

        let json = { error: false };

        try {

            const service = AuthenticationJwtService.newInstance();

            const user = await service.authenticate(req.body.email, req.body.password);
            const token = service.generate(user.id);

            json.data = { 
                token,
                'expires': service.expires(token)
            };

        }
        catch(err){

            json.error = true;
            json.message = err.message;
        }

        res.json(json);
    }

    static async verify(req, res){

        let json = { error: false };

        try {

            const service = AuthenticationJwtService.newInstance();

            json.data = service.verify(req.body.token);
        }
        catch(err){

            json.error = true;
            json.message = err.message;
        }

        res.json(json);
    }
}

module.exports = AuthController;
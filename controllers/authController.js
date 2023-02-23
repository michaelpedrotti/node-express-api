const AuthenticationJwtService = require('../services/authenticationJwtService');
const UserService = require('../services/userService');
const { permissionEnum } = require('../configs/permissions');

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

    static async verify(req, res) {

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

    static async me(req, res) {

        let json = { error: false };

        try {
            
            const mapper = Object.entries(permissionEnum).map(([key, val]) => [val, key]);

            let user = await UserService.find(res.locals.user, true);

            delete user.id;
            delete user.profile_id;
            delete user.profile.id;

            console.log('mapper', mapper);
            
            user.profile.permissions.forEach(permission => {

                delete permission.id;

                permission.actions.forEach(action => {
                    
                    action = mapper[action] || action;
                })
            });

            json.data = user;
        }
        catch(err){

            json.error = true;
            json.message = err.message;
        }

        res.json(json);
    }
}

module.exports = AuthController;
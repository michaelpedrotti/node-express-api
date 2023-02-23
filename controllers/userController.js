const AbstractController = require("./abstractController");
const UserService = require("../services/userService");
const ProfileService = require("../services/profileService");

class UserController extends AbstractController {

    static async delete(req, res) { 

        let json = { error: false };

        try {

            await UserService.transaction(async (transaction) => {

                const options = {
                    transaction: transaction,
                    // logging: console.log
                };
            
                await UserService.delete(req.params.id, options);
            });

            json.message = 'User was removed';
        }
        catch(err){

            console.error(err);

            json.message = err.message;
            json.error = true;
        }

        res.json(json);
    }

    static async update(req, res) { 

        let json = { error: false };

        try {

            const errors = super.validate(req);
    
            if (!errors.isEmpty()) {

                json.fields = errors.mapped();

                throw new Error('Check fields');
            }
    
            const model = await UserService.transaction(async (transaction) => {
        
                const options = {
                    transaction: transaction,
                    // logging: console.log
                };
        
                return await UserService.update(req.body, req.params.id, options);
            });

            json.message = 'User was updated';
            json.data = model.get({ plain: true });
        }
        catch(err){
        
            console.error(err);

            json.message = err.message;
            json.error = true;
        }

        res.json(json);
    }

    static async edit(req, res) { 

        res.json({ 
            error: false,
            data: await UserService.find(req.params.id, true),
            form: {
                profiles: await ProfileService.all()
            }
        });
    }

    static async create(req, res) { 
        
        let json = { error: false };

        try {

            const errors = super.validate(req);
        
            if (!errors.isEmpty()) {

                json.fields = errors.mapped();

                throw new Error('Check fields');
            }
        
            const [ model, password ] =  await UserService.transaction(async (transaction) => {
        
                const options = {
                    transaction: transaction,
                    // logging: console.log
                };
        
                return await UserService.create(req.body, options);
            });

            json.message = 'User was created';
            json.data = model;
            json.password = password;

            res.status(201);
        }
        catch(err) {
            
            console.error(err);
            
            json.message = err.message;
            json.error = true;
        }

        res.json(json);
    }

    static async new(req, res) {

        res.json({ 
            error: false,
            form: {
                profiles: await ProfileService.all()
            }
        });
    }

    static async show(req, res) { 

        res.json({ 
            error: false, 
            data: await UserService.find(req.params.id, true)
        });
    }

    static async index(req, res) {

        let json = { error: false, count: 0, rows: [] };

        const { count, rows } = await UserService.paginate(req);

        if(count > 0){

            json.count = count;
            json.rows = rows;
        }

        res.json(json);
    };  
}

module.exports = UserController;
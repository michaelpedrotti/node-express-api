const AbstractController = require("./abstractController");
const UserService = require("../services/userService");

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
    
            await UserService.transaction(async (transaction) => {
        
                const options = {
                    transaction: transaction,
                    // logging: console.log
                };
        
                await UserService.update(req.body, req.params.id, options);
            });

            json.message = 'User was updated';
        }
        catch(err){
        
            console.error(err);

            json.message = err.message;
            json.error = true;
        }

        res.json(json);
    }

    static async edit(req, res) { 

       UserController.show(req, res);
    }

    static async create(req, res) { 
        
        let json = { error: false };

        try {

            const errors = super.validate(req);
        
            if (!errors.isEmpty()) {

                json.fields = errors.mapped();

                throw new Error('Check fields');
            }
        
            const password =  await UserService.transaction(async (transaction) => {
        
                const options = {
                    transaction: transaction,
                    // logging: console.log
                };
        
                return await UserService.create(req.body, options);
            });

            json.message = 'User was created';
            json.data = { password };
        }
        catch(err) {
            
            console.error(err);
            
            json.message = err.message;
            json.error = true;
        }

        res.json(json);
    }

    static async new(req, res) {

        res.json({ error: false });
    }

    static async show(req, res) { 

        res.json({ error: false, data: await UserService.find(req.params.id, true)});
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
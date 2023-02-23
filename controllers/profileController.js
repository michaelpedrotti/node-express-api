const AbstractController = require("./abstractController");
const ProfileService = require("../services/profileService");

class ProfileController extends AbstractController {
    
    static async delete(req, res) { 

        let json = { error: false };

        try {

            const model = await ProfileService.transaction(async (transaction) => {

                const options = {
                    transaction: transaction,
                    // logging: console.log
                };
            
                return await ProfileService.delete(req.params.id, options);
            });

            json.message = 'Profile was removed';
            json.data = model;
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
    
            await ProfileService.transaction(async (transaction) => {
        
                const options = {
                    transaction: transaction,
                    // logging: console.log
                };
        
                await ProfileService.update(req.body, req.params.id, options);
            });

            json.message = 'Profile was updated';
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
            data: await ProfileService.find(req.params.id, true),
            form: {}
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
        
            const model = await ProfileService.transaction(async (transaction) => {
        
                const options = {
                    transaction: transaction,
                    // logging: console.log
                };
        
                return await ProfileService.create(req.body, options);
            });

            json.message = 'Profile was created';
            json.data = model;

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
            form: {}
        });
    }

    static async show(req, res) { 

        res.json({ 
            error: false, 
            data: await ProfileService.find(req.params.id, true)
        });
    }

    static async index(req, res) {

        let json = { error: false, count: 0, rows: [] };

        const { count, rows } = await ProfileService.paginate(req);

        if(count > 0){

            json.count = count;
            json.rows = rows;
        }

        res.json(json);
    }; 
}

module.exports = ProfileController;
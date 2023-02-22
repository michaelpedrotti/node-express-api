const AbstractController = require("./abstractController");
const PermissionService = require("../services/permissionService");

class PermissionController extends AbstractController {

    static async delete(req, res) { 

        let json = { error: false };

        try {

            const model = await PermissionService.transaction(async (transaction) => {

                const options = {
                    transaction: transaction,
                    // logging: console.log
                };
            
                return await PermissionService.delete(req.params.id, options);
            });

            json.message = 'Permission was removed';
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
    
            await PermissionService.transaction(async (transaction) => {
        
                const options = {
                    transaction: transaction,
                    // logging: console.log
                };

                await PermissionService.update({profile_id: req.params.profile, ...req.body}, req.params.id, options);
            });

            json.message = 'Permission was updated';
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
        
            const model = await PermissionService.transaction(async (transaction) => {
        
                const options = {
                    transaction: transaction,
                    // logging: console.log
                };


                console.log('params ', req.params);
        
                return await PermissionService.create({profile_id: req.params.profile, ...req.body}, options);
            });

            json.message = 'Permission was created';
            json.data = model;
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

        res.json({ error: false, data: await PermissionService.find(req.params.id, true)});
    }

    static async index(req, res) {

        let json = { error: false, count: 0, rows: [] };

        const { count, rows } = await PermissionService.paginate(req);

        if(count > 0){

            json.count = count;
            json.rows = rows;
        }

        res.json(json);
    }; 
}

module.exports = PermissionController;
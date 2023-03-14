const AbstractController = require("./abstractController");
const PermissionService = require("../services/permissionService");
const { permissionEnum } = require("../configs/permissions");

class PermissionController extends AbstractController {

    static async delete(req, res) { 

        let json = { error: false };

        try {

            const model = await PermissionService.transaction(async (transaction) => {

                const options = {
                    transaction: transaction,
                    // logging: console.log
                };
            
                return await PermissionService.delete(req.params, options);
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
    
            const model = await PermissionService.transaction(async (transaction) => {
        
                const options = {
                    transaction: transaction,
                    // logging: console.log
                };

                return await PermissionService.update(req.body, req.params, options);
            });

            json.message = 'Permission was updated';
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
            data: await PermissionService.find(req.params, true),
            form: {
                actions: permissionEnum,
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
        
            const model = await PermissionService.transaction(async (transaction) => {
        
                const options = {
                    transaction: transaction,
                    // logging: console.log
                };

                return await PermissionService.create({profile_id: req.params.profile, ...req.body}, options);
            });

            json.message = 'Permission was created';
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
            form: {
                actions: permissionEnum,
            }
        });
    }

    static async show(req, res) { 

        res.json({ 
            error: false, 
            data: await PermissionService.find(req.params, true)
        });
    }

    static async index(req, res) {

        let json = { error: false, count: 0, rows: [] };
        let where = {'profile_id': req.params['profile']};

        const { count, rows } = await PermissionService.paginate(req, where);

        if(count > 0){

            json.count = count;
            json.rows = rows;
        }

        res.json(json);
    }; 
}

module.exports = PermissionController;
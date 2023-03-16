const AbstractController = require("./abstractController");
const UserService = require("../services/userService");
class SettingController extends AbstractController {

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

                let data = {
                    name: req.body['name']
                }

                if(req.body['new_password']){

                    let [ , encrypt ] = passwordGenerator(req.body['new_password']);
                    data['password'] = encrypt;
                }
        
                return await UserService.update(req.body, req.user, options);
            });

            json.message = 'Settings were updated';
            // json.data = model.get({ plain: true });
        }
        catch(err){
        
            console.error(err);

            json.message = err.message;
            json.error = true;
        }

        res.json(json);
    }

    static async edit(req, res) { 
        console.log('asdfasd');
        res.json({ 
            error: false,
            data: await UserService.find(res.locals.user, true),
            form: {
                
            }
        });
    }
}

module.exports = SettingController;
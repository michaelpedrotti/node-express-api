const UserModel = require('../models/userModel');
const { passwordGenerator } = require('../helpers/passwordHelper');
const AbstractService = require('./abstractService');
const ProfileService = require('./profileService');

class UserService extends AbstractService {

    static async create(data = {}, options = {}) {

        let [ password, encrypt ] = passwordGenerator();

        const model = await UserModel.create({
            'name': data['name'],
            'email': data['email'],
            'profile_id': data['profile_id'],
            'password': encrypt
        }, options);

        const user = model.get({ plain: true }); 

        delete user.password;

        return [ user, String(password) ];
    }

    static async update(data = {}, id = 0, options = {}){

        const model = await UserModel.findByPk(id);

        if(!model) {
            throw new Error('User was not found'); 
        }

        model.set({ ...data });
        await model.save(options);

        return model;
    }

    static async find(id = 0, includes = false){

        const model = await UserModel.scope('show').findByPk(id, {raw: true});

        if(!model) {
            throw new Error('User was not found'); 
        }

        if(includes !== false){

            model.profile = await ProfileService.find(model.profile_id, true);
        }

        return model;
    }

    static async delete(id = 0, options = {}) {

        const model = await UserModel.findByPk(id);

        if(!model) {
            throw new Error('User was not found'); 
        }

        await model.destroy(options);

        return model;
    }

    static async paginate(req, where = {}, joins = []) {

        let data = { count: 0, rows: []};

        try {

            const { order } = await super.filter(req.query, where, undefined, UserModel.getAttributes());

            data =  await UserModel.scope('show').findAndCountAll({
                raw: true,
                include: joins,
                // logging: console.log,
                attributes: ['id', 'email', 'name'],
                where: where,
                order: order,
                limit: Number(req.query.limit || 10),
                offset: Number(req.query.offset || 0),
            });
        }
        catch(err){

            console.log('err', err);
        }

        return data;
    }
}

module.exports = UserService; 
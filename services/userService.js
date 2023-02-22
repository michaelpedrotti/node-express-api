const UserModel = require('../models/userModel');
const { passwordGenerator } = require('../helpers/passwordHelper');
const AbstractService = require('./abstractService');

class UserService extends AbstractService {

    static async create(data = {}, options = {}) {

        let [ password, encrypt ] = passwordGenerator();

        const model = await UserModel.create({
            'name': data['name'],
            'email': data['email'],
            'profile_id': data['profile_id'],
            'password': encrypt
        }, options);

        return String(password);
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

            const { order } = await super.filter(req.body, where, undefined, UserModel.getAttributes());

            data =  await UserModel.scope('show').findAndCountAll({
                raw: true,
                include: joins,
                attributes: ['id', 'email', 'name'],
                where: where,
                order: order,
                limit: Number(req.query.length || 10),
                offset: Number(req.query.start || 0),
            });
        }
        catch(err){

            console.log('err', err);
        }

        return data;
    }
}

module.exports = UserService; 
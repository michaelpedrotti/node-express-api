const ProfileModel = require('../models/profileModel');
const AbstractService = require('./abstractService');

class ProfileService extends AbstractService {

    static async create(data = {}, options = {}) {
        
        const model = await ProfileModel.create({
            name: data['name']
        }, options);

        return model;
    }

    static async update(data = {}, id = 0, options = {}){

        const model = await ProfileModel.findByPk(id);

        if(!model) {
            throw new Error('Profile was not found'); 
        }

        model.set({ ...data });
        await model.save(options);

        return model;
    }

    static async find(id = 0, includes = false){

        const model = await ProfileModel.findByPk(id, {raw: true});

        if(!model) {
            throw new Error('Profile was not found'); 
        }

        return model;
    }

    static async delete(id = 0, options = {}) {

        const model = await ProfileModel.findByPk(id);

        if(!model) {
        throw new Error('Profile was not found'); 
        }

        await model.destroy(options);

        return model;
    }

    static async paginate(req, where = {}, joins = []) {

        let data = { count: 0, rows: [] };

         try {

            const { order } = await super.filter(req.body, where, undefined, ProfileModel.getAttributes());

            data =  await ProfileModel.findAndCountAll({
                raw: true,
                include: joins,
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

module.exports = ProfileService; 
const PermissionModel = require('../models/permissionModel');
const ProfileModel = require('../models/profileModel');
const AbstractService = require('./abstractService');

class PermissionService extends AbstractService {

    static async profiles(){

        return await ProfileModel.findAll({
            attributes: ['id', 'name']
        });
    }

    static async create(data = {}, options = {}) {

        const model = await PermissionModel.create({
            'resource': data['resource'],
            'actions': data['actions'],
            'profile_id': data['profile_id'],
        }, options);

        return model;
    }

    static async update(data = {}, id = 0, options = {}){

        const model = await PermissionModel.findByPk(id);

        if(!model) {
            throw new Error('Permission was not found'); 
        }

        model.set({ ...data });
        await model.save(options);

        return model;
    }

    static async find(id = 0, includes = false){

        const model = await PermissionModel.findByPk(id, {raw: true});

        if(!model) {
            throw new Error('Permission was not found'); 
        }

        return model;
    }

    static async delete(id = 0, profile = 0, options = {}) {

        const model = await PermissionModel.findByPk(id);

        if(!model) {
        throw new Error('Permission was not found'); 
        }

        await model.destroy(options);

        return model;
    }

    static async paginate(req, where = {}, joins = []) {

        let data = { count: 0, rows: [] };

         try {

            const { order } = await super.filter(req.body, where, undefined, PermissionModel.getAttributes());

            data =  await PermissionModel.findAndCountAll({
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

module.exports = PermissionService; 
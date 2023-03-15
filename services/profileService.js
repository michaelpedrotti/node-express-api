const ProfileModel = require('../models/profileModel');
const AbstractService = require('./abstractService');
const PermissionService = require('./permissionService');
const { Op } = require('sequelize');

class ProfileService extends AbstractService {
    
    static async create(data = {}, options = {}) {
        
        const model = await ProfileModel.create({
            name: data['name']
        }, options);

        if(data.permissions){

            for (const [resource, actions] of Object.entries(data.permissions)) {

                PermissionService.create({
                    'resource': resource,
                    'actions': actions,
                    'profile_id': model.id,
                });
            }   
        }

        return model;
    }

    static async update(data = {}, id = 0, options = {}){

        console.log('data', data);

        const model = await ProfileModel.findByPk(id);

        if(!model) {
            throw new Error('Profile was not found'); 
        }

        model.set({ ...data });
        await model.save(options);


        if(data.permissions){

            const deleted = await PermissionService.all({
                // logging: console.log,
                attributes: ['id'],
                where: {
                    profile_id: model.id,
                    resource: {[Op.notIn]: Object.keys(data.permissions)}
                }
            });

            if(deleted){

                deleted.map(async(row) => {

                    await PermissionService.delete({id: row.id, profile: model.id}, options);
                });
            }
            
            const saved = Object.fromEntries(
                (await PermissionService.all({
                    // logging: console.log,
                    attributes: ['id', 'resource'],
                    where: {
                        profile_id: model.id,
                        resource: {[Op.in]: Object.keys(data.permissions)}
                    }
                }))
                .map(row => [row.resource, row.id])
            );

            console.log('saved', saved);


            for (const [resource, actions] of Object.entries(data.permissions)) {

                if(saved[resource]){

                    console.log(saved[resource], resource);

                    await PermissionService.update(
                        {"actions": actions}, 
                        {id: saved[resource], profile: model.id}, 
                        options
                    );
                }
                else {

                    await PermissionService.create({
                        'resource': resource,
                        'actions': actions,
                        'profile_id': model.id,
                    }, options);
                }

                //PermissionService.create();
            }   
        }


        return model;
    }

    static async find(id = 0, includes = false){

        const model = await ProfileModel.findByPk(id, { raw: true });

        if(!model) {
            throw new Error('Profile was not found'); 
        }

        if(includes !== false) {

            model.permissions = await PermissionService.all({
                where: { profile_id: model.id},
                attributes: ['id', 'resource', 'actions']
            });
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

    static async all(options = {}){

        return await ProfileModel.findAll(Object.assign({
                raw: true,
                order: [['id', 'ASC']],
                attributes: ['id', 'name'],
                // logging: console.log
            }, 
            options
        ));
    }

    static async paginate(req, where = {}, joins = []) {

        let data = { count: 0, rows: [] };

         try {

            const { order } = await super.filter(req.query, where, undefined, ProfileModel.getAttributes());

            data =  await ProfileModel.findAndCountAll({
                raw: true,
                include: joins,
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

module.exports = ProfileService; 
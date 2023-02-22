const sequelize = require('sequelize');
const { database } = require('../helpers/connectionHelper');

class AbstractService {


    static async transaction(fn = async(transaction) => {}){

        return await database().transaction(fn);
    }

     /**
     * @param {Object} body
     * @param {sequelize.WhereOptions} where
     * @param {sequelize.Order} order
     * @returns {Object} 
     */
     static async filter(data = {}, where = {}, order = [], attributes = {}) {

         if(data.field){

            for (const [name, value] of Object.entries(data.field)) {

                switch(String(attributes[name]?.type).replace(/\([^\)]+\)/, '').toString()){

                    case 'VARCHAR':
                    case 'STRING':
                        where[name] = {[sequelize.Op.like]: `%${value}%`};
                        break;

                    default:
                        where[name] = value;
                }
            }
        }

        if(data.order){

            for (const [column, dir] of Object.entries(data.order)) {

                order.push([sequelize.literal(column), String(dir).toUpperCase()]);
            }
        }
        else {

            order.push(["id", "DESC"]);
        }

        return { where, order };
    }

    async create(data = {}, options = {}) {

        throw new Error('Create was not implemented');
    }

    async update(data = {}, id = 0, options = {}) {

        throw new Error('Update was not implemented');
    }

    async find(id = 0) {

        throw new Error('Find was not implemented');
    }

    async delete(id = 0, options = {}) {

        throw new Error('Delete was not implemented');
    }

    async paginate(where = {}, joins = []) {

        throw new Error('Paginate was not implemented');
    }
}

module.exports = AbstractService;
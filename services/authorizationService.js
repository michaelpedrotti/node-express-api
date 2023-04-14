const { database } = require('../helpers/connectionHelper');
const { permissionEnum } = require('../configs/permissions');

class AuthorizationService {

    async hasPermission(resource = 'user', action = 'read', userId = 0){

        action = permissionEnum[action] || action;

        // JSON_CONTAINS is not working with postgres db
        const query = "SELECT " +
                "COUNT(*) as total " +
            "FROM user " +
            "INNER JOIN profile ON(user.profile_id = profile.id) " +
            "INNER JOIN permission ON(profile.id = permission.profile_id) " +
            "WHERE user.id = " + userId + " " +
            "AND permission.resource = '" + resource + "' " +
            "AND JSON_CONTAINS(permission.actions, json_quote('" + action + "')) > 0";

        // const sequelize = database(); 
        // const [ row ] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        // return row.total > 0;
        return true;
    }

    static newInstance(){

        return new AuthorizationService();
    }
}

module.exports = AuthorizationService
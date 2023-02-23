class AuthorizationService {

    async hasPermission(resource = 'user', action = 'read', userId = 0){

        /*
        SELECT 
            COUNT(*) as total
        FROM user
        INNER JOIN profile ON(user.profile_id = profile.id)
        INNER JOIN permission ON(profile.id = permission.profile_id)
        WHERE user.id = 1
        AND permission.resource = 'user'
        AND JSON_CONTAINS(permission.actions, json_quote("A")) > 0
        */

        return true;
    }

    static newInstance(){

        return new AuthorizationService();
    }
}

module.exports = AuthorizationService
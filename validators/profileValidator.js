const { checkSchema } = require('express-validator');

/**
 * @requires express-validation
 * @example https://express-validator.github.io/docs/schema-validation.html 
 */
const profileSchema = {
    
    name: {
        notEmpty:{
            errorMessage: 'Name is required'
        }
    }
};

module.exports = { profileSchema, 'profileValidator': checkSchema(profileSchema) };
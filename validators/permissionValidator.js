const { checkSchema } = require('express-validator');

/**
 * @requires express-validation
 * @example https://express-validator.github.io/docs/schema-validation.html 
 */
const permissionSchema = {
    
    resource: {
        notEmpty:{
            errorMessage: 'Resource is required'
        }
    }
};

module.exports = { permissionSchema, 'permissionValidator': checkSchema(permissionSchema) };
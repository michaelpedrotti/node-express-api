const { checkSchema } = require('express-validator');
const UserModel = require('../models/userModel');

/**
 * @requires express-validation
 * @example https://express-validator.github.io/docs/schema-validation.html 
 */
const userSchema = {
    
    name: {
        notEmpty:{
            errorMessage: 'Name is required'
        }
    },
    email: {
        notEmpty:{
            errorMessage: 'E-mail is required'
        },
        isEmail: {
          errorMessage: 'Invalid e-mail'
        }
    }
};

module.exports = { userSchema, 'userValidator': checkSchema(userSchema) };
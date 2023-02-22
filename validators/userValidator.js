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
        },
        custom: {
            // https://express-validator.github.io/docs/custom-validators-sanitizers.html
            options: (value, { req }) => {

                return UserModel.findOne({'where': {'email': value}}).then(model => {
                    
                    if (model) {

                        if(model.id != req.params.id){

                            return Promise.reject('E-mail is already being used');
                        }
                    }
                });
            }
        }
    },
    profile_id: {
        notEmpty:{
            errorMessage: 'Profile is required'
        }
    }
};

module.exports = { userSchema, 'userValidator': checkSchema(userSchema) };
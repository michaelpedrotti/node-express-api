const { checkSchema } = require('express-validator');
const { passwordCompare } = require('../helpers/passwordHelper');
const UserModel = require('../models/userModel');

/**
 * @requires express-validation
 * @example https://express-validator.github.io/docs/schema-validation.html 
 */
const settingSchema = {
    
    name: {
        notEmpty:{
            errorMessage: 'Name is required'
        }
    },
    'current_password': {
        custom: {
            options: (value, { req }) => {

                if(req.body['new_password']){

                    return UserModel.findByPk(req.user).then(model => {
                        
                        if(!passwordCompare(value, model['password'])){

                            return Promise.reject('Current password was wrong');
                        }
                    });
                }
            }
        }
    },
    'new_password': {
        custom: {
            options: (value, { req }) => {

                if(req.body['current_password']){

                    if(String(value).length < 8){
                        throw new Error('Password should be at least 8 chars long');
                    }
                    
                    if(!/[A-Z]/.test(value)){

                        throw new Error('Password should have some uppercase character');
                    }
                    
                    if(!/[\W]/.test(value)){

                        throw new Error('Password should have some non-alphanumeric');
                    }   
                }

                return true;
            }
        }
    }
};

module.exports = { settingSchema, 'settingValidator': checkSchema(settingSchema) };
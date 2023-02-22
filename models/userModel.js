
'use strict';
const { DataTypes, Model } = require('sequelize');
/**
 * 
 * @example https://sequelize.org/v4/manual/tutorial/models-definition.html
 */
class UserModel extends Model {}
 
UserModel.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        unique: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
},
{
    sequelize: global.sequelize,
    modelName:'UserModel',
    tableName: 'user',
    timestamps: true,
    scopes: {
        'show': {
            attributes: { 
                exclude: ['password'] 
            }
        }
    }
});

module.exports = UserModel;
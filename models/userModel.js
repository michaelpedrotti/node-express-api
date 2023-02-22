
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
    profile_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            name: 'fk_63f64cc127e85',
            model: 'profile',
            key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
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
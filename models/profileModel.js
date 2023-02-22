const { DataTypes, Model } = require('sequelize'); 

/**
 * 
 * @example https://sequelize.org/v4/manual/tutorial/models-definition.html
 */
class ProfileModel extends Model {}
 
ProfileModel.init({
    
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
},
{
    sequelize: global.sequelize,
    modelName:'ProfileModel',
    tableName: 'profile',
    timestamps: true
});

module.exports = ProfileModel;
'use strict';

module.exports = {
  
  /**
   * @param {sequelize.queryInterface} queryInterface
   * @param {sequelize.DataTypes} DataTypes
   * @link https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface 
   */
  up: (queryInterface, { DataTypes }) => {
    return queryInterface.createTable('user', {
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
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('user');
  }
};
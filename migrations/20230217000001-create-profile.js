'use strict';

module.exports = {

  /**
   * @param {sequelize.queryInterface} queryInterface
   * @param {sequelize.DataTypes} DataTypes
   * @link https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface 
   */
  up: (queryInterface, { DataTypes }) => {
    return queryInterface.createTable('profile', {

      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name:{
        type: DataTypes.STRING(100),
        allowNull: false
      },
      createdAt:{
        type: DataTypes.DATE,
        allowNull: true
      },
      updatedAt:{
        type: DataTypes.DATE,
        allowNull: true
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('profile');
  }
};

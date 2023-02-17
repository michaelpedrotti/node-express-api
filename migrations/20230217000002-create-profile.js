'use strict';

module.exports = {

  /**
   * @param {sequelize.queryInterface} queryInterface
   * @param {sequelize.DataTypes} DataTypes
   * @link https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface 
   */
  up: (queryInterface, { DataTypes }) => {
    return queryInterface.createTable('profile', {});
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('profile');
  }
};

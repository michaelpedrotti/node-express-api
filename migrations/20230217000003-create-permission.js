'use strict';

module.exports = {

  /**
   * @param {sequelize.queryInterface} queryInterface
   * @param {sequelize.DataTypes} DataTypes
   * @link https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface 
   */
  up: (queryInterface, { DataTypes }) => {
    return queryInterface.createTable('permission', {

      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      profile_id:{
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              name: 'fk_6398c8302c1e7',
              model: 'profile',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'CASCADE'
      },
      resource:{
        type: DataTypes.STRING(50),
        allowNull: false
      },
      actions:{
        type: DataTypes.JSON(),
        allowNull: false
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('permission');
  }
};

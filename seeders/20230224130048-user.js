'use strict';
const { passwordGenerator } = require('../helpers/passwordHelper');

/** 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {

  async up (queryInterface, Sequelize) {

    const now = new Date();
    
    await queryInterface.bulkInsert('user', [
      {
        "id": 1,
        "name" : "Administrator",
        "email" : "admin@xyz.io",
        "password" : passwordGenerator('admin')[1],
        "profile_id" : 1,
        "createdAt" : now,
        "updatedAt" : now
      },
      {
        "id": 2,
        "name" : "Reader",
        "email" : "reader@xyz.io",
        "password" : passwordGenerator('reader')[1],
        "profile_id" : 2,
        "createdAt" : now,
        "updatedAt" : now
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('user');
  }
};

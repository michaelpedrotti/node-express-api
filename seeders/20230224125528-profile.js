'use strict';

/** 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {

  async up (queryInterface, Sequelize) {
    
    const now = new Date();

    await queryInterface.bulkInsert('profile', [
      {
        "id" : 1,
        "name" : "Admin",
        "createdAt" : now,
        "updatedAt" : now
      },
      {
        "id" : 2,
        "name" : "Readonly",
        "createdAt" : now,
        "updatedAt" : now
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('profile');
  }
};
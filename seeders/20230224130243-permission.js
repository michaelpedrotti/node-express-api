'use strict';

/** 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('permission', [
      {
        "profile_id" : 1,
        "resource" : "user",
        "actions" : '["C", "R", "U", "D"]'
      },
      {
        "profile_id" : 1,
        "resource" : "profile",
        "actions" : '["C", "R", "U", "D"]'
      },
      {
        "profile_id" : 1,
        "resource" : "permission",
        "actions" : '["C", "R", "U", "D"]'
      },
      {
        "profile_id" : 1,
        "resource" : "github",
        "actions" : '["C"]'
      },
      {
        "profile_id" : 2,
        "resource" : "user",
        "actions" : '["R"]'
      },
      {
        "profile_id" : 2,
        "resource" : "profile",
        "actions" : '["R"]'
      },
      {
        "profile_id" : 2,
        "resource" : "permission",
        "actions" : '["R"]'
      },
      {
        "profile_id" : 1,
        "resource" : "github",
        "actions" : '["C"]'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('permission');
  }
};

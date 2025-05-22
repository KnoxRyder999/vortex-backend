'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Azlan Yusof',
        email: 'sanderberg786@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fawaz Hassan',
        email: 'vortex@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Adam dean',
        email: 'vortex1@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

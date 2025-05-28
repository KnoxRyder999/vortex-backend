'use strict';

const crypto = require('crypto');

function hashPassword(password, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: 'Azlan Yusof',
        email: 'sanderberg786@gmail.com',
        isAdmin: 10,
        password: 'aaa',
        avatar: 'alice.jpg',
      },
      {
        name: '𝔇𝔞𝔯𝔨 𝔪𝔞𝔤𝔦𝔠',
        email: 'Axelnight@example.com',
        password: 'aaa',
        isAdmin: 1,
        role: "Lead Developer",
        avatar: 'magic.jpeg',
      },
      {
        name: 'Fawaz Hassan',
        email: 'contact@vortexbytes.com',
        password: 'aaa',
        role: "3D Modeler",
        contact: {
          discord: "VortextBytes#1234",
          email: "contact@vortexbytes.com"
        },
        isAdmin: 2,
        avatar: 'Fawaz.jpg',
      },
      {
        name: 'Adam dean',
        email: 'Adam@example.com',
        password: 'aaa',
        isAdmin: 1,
        role: "Server Specialist",
        avatar: 'adam.jpg',
      },
    ];

    const now = new Date();

    const usersWithHash = users.map((user) => {
      const salt = crypto.randomBytes(16).toString('hex');
      return {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        salt,
        role: '[]',
        password: hashPassword(user.password, salt),
        avatar: user.avatar,
        createdAt: now,
        updatedAt: now,
      };
    });

    await queryInterface.bulkInsert('users', usersWithHash);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: ['alice@example.com', 'bob@example.com', 'charlie@example.com'],
    });
  },
};
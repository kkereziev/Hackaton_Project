'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'johndoe',
          phash: bcrypt.hashSync('johndoe', 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'test123',
          phash: bcrypt.hashSync('test123', 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        // 1
        {
          name: 'Learning',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 2
        {
          name: 'Administrative',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 3
        {
          name: 'Standart Time Off',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 4
        {
          name: 'Marriage (BG only)',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 5
        {
          name: 'Training',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 6
        {
          name: 'Hiring / Recruitment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 7
        {
          name: 'Research / Process Improvement',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 8
        {
          name: 'Bench Time',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ProjectsTasks',
      [
        {
          projectId: 1,
          taskId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 1,
          taskId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 2,
          taskId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 3,
          taskId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 3,
          taskId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 4,
          taskId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 4,
          taskId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 4,
          taskId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 4,
          taskId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 5,
          taskId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 6,
          taskId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProjectsTasks', null, {});
  },
};

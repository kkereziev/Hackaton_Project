'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Projects',
      [
        // 1
        {
          name: 'MentorMate L&D: 2020.2.DevCamp',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 2
        {
          name: 'MentorMate: Scrum Training',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 3
        {
          name: 'MentorMate: Time Off',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 4
        {
          name: 'MentorMate: Internal',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 5
        {
          name: 'MentorMate: Interviewing Skills Training',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // 6
        {
          name: 'MentorMate: Giving & Receiving Feedback Training',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Projects', null, {});
  },
};

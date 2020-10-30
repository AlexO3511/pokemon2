'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Players",
      [
        {
          name: 'Ash Ketchum',
          username: 'Ash',
          password: 'Pika',
          teamId: 1
      },
      {
          name: 'Elio' ,
          username: 'Elio',
          password: '1234',
          teamId: 2
      },
      {
          name: 'Brendan',
          username: 'Brendan',
          password: '4567',
          teamId: 3
      },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

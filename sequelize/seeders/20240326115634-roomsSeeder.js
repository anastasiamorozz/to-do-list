'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roomsData = [];
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users', { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    users.forEach(user => {
      for (let i = 0; i < 10; i++) {
        roomsData.push({
          name: faker.word.adjective(),
          creator_id: user.id,
          created_at: new Date()
        });
      }
    });

    await queryInterface.bulkInsert('rooms', roomsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};

'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rooms = await queryInterface.sequelize.query('SELECT * FROM Rooms', {
      type: Sequelize.QueryTypes.SELECT,
    });

    for (const room of rooms) {
      for (let i = 0; i < 100; i++) {
        await queryInterface.bulkInsert('tasks', [{
          title: faker.word.adjective(),
          day: faker.date.recent(),
          status: faker.helpers.arrayElement(['To Do', 'In Progress', 'Completed']),
          room_id: room.room_id, 
          creator_id: room.creator_id, 
          created_at: new Date(),
        }], {});
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};

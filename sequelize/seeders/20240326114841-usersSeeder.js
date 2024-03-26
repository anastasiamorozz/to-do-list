'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    const password = await bcrypt.hash('password', 10); 

    for (let i = 0; i < 100; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: password
      });
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true // Додаємо унікальний індекс для поля username
      },
      email: {
        type: Sequelize.STRING,
        unique: true // Додаємо унікальний індекс для поля email
      },
      password: {
        type: Sequelize.STRING
      }
    });

    // Додаємо індекси до полів username та email
    await queryInterface.addIndex('users', ['username']);
    await queryInterface.addIndex('users', ['email']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsersInRooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Додаємо індекси до полів room_id та user_id
    await queryInterface.addIndex('UsersInRooms', ['room_id']);
    await queryInterface.addIndex('UsersInRooms', ['user_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UsersInRooms');
  }
};

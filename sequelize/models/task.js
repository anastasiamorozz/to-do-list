'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Task', {
      task_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['To Do', 'In Progress', 'Completed']]
        }
      },
      room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'room_id'
        },
        onDelete: 'CASCADE'
      },
      creator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
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

    // Додаємо індекси
    await queryInterface.addIndex('Task', ['room_id']);
    await queryInterface.addIndex('Task', ['creator_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Task');
  }
};

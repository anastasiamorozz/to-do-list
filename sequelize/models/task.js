'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Task extends Model {}
  
  Task.init({
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    day: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['To Do', 'In Progress', 'Completed']]
      }
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rooms',
        key: 'room_id'
      },
      onDelete: 'CASCADE'
    },
    creator_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Task',
    underscored: true,
    timestamps: false
  });

  return Task;
};

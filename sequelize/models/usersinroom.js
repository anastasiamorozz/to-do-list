'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersInRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsersInRoom.init({
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Rooms',    // Посилання на модель Rooms
        key: 'room_id'     // Поле, на яке посилається room_id
      },
      onDelete: 'CASCADE'
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users', // Посилання на модель Users
        key: 'id'      // Поле, на яке посилається user_id
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'UsersInRoom',
  });
  return UsersInRoom;
};
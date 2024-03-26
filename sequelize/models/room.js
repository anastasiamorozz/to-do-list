'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'creator_id'}) 
    }
  }
  Room.init({
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    creator_id: DataTypes.INTEGER,
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    } 
  }, {
    sequelize,
    modelName: 'Room',
    underscored: true,
    timestamps:false
  });
  return Room;
};
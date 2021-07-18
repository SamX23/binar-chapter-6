"use strict";
const { Model } = require("sequelize");
const user_game_biodata = require("./user_game_biodata");

module.exports = (sequelize, DataTypes) => {
  class User_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_game.init(
    {
      user_id: DataTypes.INTEGER,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_game",
    }
  );
  User_game.hasMany(user_game_biodata, {
    foreignKey: "user_id",
  });
  return User_game;
};

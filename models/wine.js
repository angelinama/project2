"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wine.init(
    {
      wineName: DataTypes.STRING,
      category: DataTypes.STRING,
      country: DataTypes.STRING,
      region: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wine",
    }
  );
  return Wine;
};

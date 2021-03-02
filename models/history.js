"use strict";

module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define("History", {
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  History.associate = (models) => {
    History.belongsTo(models.Wine, {
      foreignKey: {
        allowNull: false,
        name: "wine_id",
      },
    });
    History.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "user_id",
      },
    });
  };

  return History;
};

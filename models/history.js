"use strict";

module.exports = (sequelize) => {
  const History = sequelize.define("History", {});

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

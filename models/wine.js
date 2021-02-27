"use strict";

module.exports = (sequelize, DataTypes) => {
  //match the ER diagram, only country and year could be null
  const Wine = sequelize.define("Wine", {
    wine_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: DataTypes.STRING,
    year: DataTypes.INTEGER,
  });

  Wine.associate = (models) => {
    Wine.hasMany(models.Review, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false,
        name: "wine_id",
      },
    });
  };

  return Wine;
};

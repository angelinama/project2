"use strict";

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    sweetness_score: { type: DataTypes.INTEGER, defaultValue: null },
    acidity_score: { type: DataTypes.INTEGER, defaultValue: null },
    tannis_score: { type: DataTypes.INTEGER, defaultValue: null },
    body_score: { type: DataTypes.INTEGER, defaultValue: null },
    overall_score: { type: DataTypes.INTEGER, defaultValue: null },
    fruity: { type: DataTypes.BOOLEAN, defaultValue: null },
    herbal: { type: DataTypes.BOOLEAN, defaultValue: null },
    earth: { type: DataTypes.BOOLEAN, defaultValue: null },
    floral: { type: DataTypes.BOOLEAN, defaultValue: null },
    spice: { type: DataTypes.BOOLEAN, defaultValue: null },
    chemical: { type: DataTypes.BOOLEAN, defaultValue: null },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Wine, {
      foreignKey: {
        allowNull: false,
        name: "wine_id",
      },
    });
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "user_id",
      },
    });
  };

  return Review;
};

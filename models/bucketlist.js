"use strict";

module.exports = (sequelize) => {
  const Bucketlist = sequelize.define("Bucketlist", {});

  Bucketlist.associate = (models) => {
    Bucketlist.belongsTo(models.Wine, {
      foreignKey: {
        allowNull: false,
        name: "wine_id",
      },
    });
    Bucketlist.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "user_id",
      },
    });
  };

  return Bucketlist;
};

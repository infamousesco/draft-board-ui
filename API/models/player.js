"use strict";
const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Player extends Sequelize.Model {}
  Player.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A first name is required",
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A last name is required",
          },
        },
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter players position",
          },
        },
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      byeWeek: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    { sequelize }
  );
  return Player;
};

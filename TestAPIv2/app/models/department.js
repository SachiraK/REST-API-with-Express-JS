"use strict";

module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define(
    "department",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      departmentName: {
        type: Sequelize.STRING,
        required: true,
      },
    },
    {
      underscored: true,
    }
  );
  return Department;
};

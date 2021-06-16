"use strict";

module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define(
    "department",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        // defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      departmentName: {
        type: Sequelize.STRING,
        required: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: Sequelize.DATE,
    },
    {
      underscored: true,
    }
  );
  return Department;
};

"use strict";

module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define(
    "department",
    {
      department_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        //defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: true
      },
      department_name: {
        type: Sequelize.STRING,
        required: true,
      },
      created_at: {
        type: Sequelize.DATE,
        //allowNull: false,
      },
      updated_at: Sequelize.DATE,
    },
    {
      underscored: true,
    }
  );
  return Department;
};

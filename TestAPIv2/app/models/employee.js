"use strict";

module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    "employees",
    {
      employees_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        required: true,
      },
      nic: {
        type: Sequelize.STRING,
        required: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: Sequelize.DATE,
      department_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      underscored: true,
    }
  );
  return Employee;
};

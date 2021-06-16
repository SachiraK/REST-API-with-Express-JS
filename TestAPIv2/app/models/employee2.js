module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employees", {
    name: {
      type: Sequelize.STRING,
    },
    departmentName: {
      type: Sequelize.STRING,
    },
    nic: {
      type: Sequelize.STRING,
    },
  });

  return Employee;
};

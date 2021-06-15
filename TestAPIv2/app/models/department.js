module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("department", {
    deptname: {
      type: Sequelize.STRING,
    },
  });

  return Department;
};

module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employees", {
      name: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      nic: {
        type: Sequelize.STRING
      }
    });
  
    return Employee;
  };
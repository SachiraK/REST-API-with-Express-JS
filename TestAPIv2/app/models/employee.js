// 'use strict';

// module.exports = (sequelize, Sequelize) => {
//   const Employee = sequelize.define("employees", {
//     employee_id: {
//       type: Sequelize.UUID,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//       defaultValue: Sequelize.UUIDV4
//     },
//     name:{
//       type: Sequelize.STRING,
//       required: true
//     },
//     department: {
//       type: Sequelize.STRING,
//       required: true
//     },
//     nic: {
//       type: Sequelize.STRING,
//       required: true
//     },
//     createdAt: {
//       type: Sequelize.DATE,
//       allowNull:false
//     },
//     updatedAt: Sequelize.DATE
    
//   });

//   return Employee;
// };

"use strict";



module.exports = (sequelize, Sequelize) => {

  const Employee = sequelize.define(

    "employees",

    {

      employees_id: {

        type: Sequelize.INTEGER,

        primaryKey: true,

        //defaultValue: Sequelize.UUIDV4,

        allowNull: false,
        autoIncrement: true

      },

      name: {

        type: Sequelize.STRING,

        required: true,

      },
      nic: {

        type: Sequelize.STRING,

        required: true,

      },
      department_id:{
        type: Sequelize.INTEGER
      },

      created_at: {

        type: Sequelize.DATE,

        //allowNull: f,

      },

      updated_at: Sequelize.DATE,

    },

    {

      underscored: true,

    }

  );

  return Employee;

};

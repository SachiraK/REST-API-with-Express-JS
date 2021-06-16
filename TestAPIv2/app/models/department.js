// 'use strict';

// module.exports = (sequelize, Sequelize) => {
//   const Department = sequelize.define("department", {
//     department_id:{
//       type: Sequelize.UUID,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//       defaultValue: Sequelize.UUIDV4
//     },
//     department: {
//       type: Sequelize.STRING,
//       required: true
//     },
//     createdAt: {
//       type: Sequelize.DATE,
//       allowNull:false
//     },
//     updatedAt: Sequelize.DATE
//   });

//   return Department;
// };

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

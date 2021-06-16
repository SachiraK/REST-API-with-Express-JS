// const Sequelize = require("sequelize");
// const EmployeesModel = require("../models/employee");
// const DepartmentModel = require("../models/department");
// require("dotenv").config();

// const HOST = process.env.DB_HOST;
// const USER = process.env.DB_USER;
// const PASSWORD = process.env.DB_PASS;
// const DATABASE_NAME = process.env.DB_NAME;

// const sequelize = new Sequelize(DATABASE_NAME, USER, PASSWORD, {
//   host: HOST,
//   dialect: "mysql",
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

// // const employees = EmployeesModel(sequelize, Sequelize);
// // const department = DepartmentModel(sequelize, Sequelize);
// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.employees = EmployeesModel(sequelize, Sequelize);
// db.departments = DepartmentModel(sequelize, Sequelize);

// //relations
// // db.employees.belongsTo(db.departments);
// // db.departments.hasMany(db.employees);

// module.exports = db;

const Sequelize = require("sequelize");
const EmployeesModel = require("../models/employee");
const DepartmentModel = require("../models/department");
require("dotenv").config();

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;
const DATABASE_NAME = process.env.DB_NAME;

const sequelize = new Sequelize(DATABASE_NAME, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// const employees = EmployeesModel(sequelize, Sequelize);
// const department = DepartmentModel(sequelize, Sequelize);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = EmployeesModel(sequelize, Sequelize);
db.departments = DepartmentModel(sequelize, Sequelize);

db.departments.hasMany(db.employees, {
  as: "employees",
  foreignKey: "department_id",
  sourceKey: "department_id"
});
db.employees.belongsTo(db.departments, {
  foreignKey: "department_id",
  targetKey: "department_id",
});

// sequelize.sync({ force: false }).then(() => {
//   console.log(`Database & tables created here!`);
// });

module.exports = db;



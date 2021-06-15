const Sequelize = require("sequelize");
const EmployeesModel = require("../models/employee");
const DepartmentModel = require("../models/department");
require("dotenv").config();

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;
const DIALECT = process.env.DB_DIALECT;
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

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created here!`);
});

module.exports = db;

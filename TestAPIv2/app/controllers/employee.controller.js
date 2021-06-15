const Sequelize = require("sequelize");
let validate = require("validate.js");

const db = require("../config/db.config");
const Employee = db.employees;
const Op = Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (
    validate.isEmpty(req.body.name) ||
    validate.isEmpty(req.body.department) ||
    validate.isEmpty(req.body.nic)
  ) {
    res.status(400).send({
      message: "One or more field/fields is/are missing!",
    });
    return;
  }

  //Register an Employee
  if (
    validate.isString(req.body.name) &&
    validate.isString(req.body.department) &&
    validate.isString(req.body.nic) &&
    req.body.nic.slice(-1).toLowerCase() === "v"
  ) {
    const employee = {
      name: req.body.name,
      department: req.body.department,
      nic: req.body.nic,
    };

    // Save Tutorial in the database
    Employee.create(employee)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while registering the employee.",
        });
      });
  } else {
    res.status(400).send({
      message: "Input String values only",
    });
    return;
  }
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Employee.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees.",
      });
    });
};

exports.findOne = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;

    Employee.findByPk(id)
      .then((data) => {
        if (data === null) {
          res.status(500).send({
            message: "No Employee with id=" + id + " yet.",
          });
        }
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Employee with id=" + id,
        });
      });
  } else {
    res.send({ message: "Enter a numerical value as the ID" });
  }
};

exports.update = (req, res) => {
  // if (validate.isEmpty(req.params.id)) {
  //   res.send({ message: "Enter the Employee ID you want to update" });
  // } else {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;
    if (
      validate.isString(req.body.name) &&
      validate.isString(req.body.department) &&
      validate.isString(req.body.nic) &&
      req.body.nic.slice(-1).toLowerCase() === "v"
    ) {
      Employee.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Employee details were updated successfully.",
            });
          }
          // else {
          //   res.send({
          //     message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
          //   });
          // }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Employee with id=" + id,
          });
        });
    } else {
      res.send({ message: "Follow the body validation" });
    }
  } else {
    res.send({ message: "ID should be a Number!" });
    // }
  }
};

exports.delete = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;
    Employee.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Employee was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Employee with id=" + id,
        });
      });
  } else {
    res.send({ message: "ID should be a Number!" });
  }
};

exports.deleteAll = (req, res) => {
  Employee.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Employees were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees.",
      });
    });
};

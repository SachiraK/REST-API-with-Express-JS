const Sequelize = require("sequelize");
let validate = require("validate.js");

const db = require("../config/db.config");
const Employee = db.employees;
const Department = db.departments;

const Op = Sequelize.Op;

exports.createEmployee = (req, res) => {
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
      departmentID: req.body.departmentID,
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

exports.createDepartment = (req, res) => {
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

  //Register an Department
  if (
    validate.isString(req.body.name) &&
    validate.isString(req.body.department) &&
    validate.isString(req.body.nic) &&
    req.body.nic.slice(-1).toLowerCase() === "v"
  ) {
    const departmenet = {
      name: req.body.name,
    };

    // Save Tutorial in the database
    Employee.create(departmenet)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while registering the department.",
        });
      });
  } else {
    res.status(400).send({
      message: "Input String values only",
    });
    return;
  }
};

exports.findAllEmployee = (req, res) => {
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

exports.findAllDepartment = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Department.findAll({ where: condition })
    .then((data) => {
      res.send({ data: data, include: ["employees"] });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Department.",
      });
    });
};

exports.findOneEmployee = (req, res) => {
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

exports.findOneDepartment = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;

    Department.findByPk(id)
      .then((data) => {
        if (data === null) {
          res.status(500).send({
            message: "No Department with id=" + id + " yet.",
          });
        }
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Department with id=" + id,
        });
      });
  } else {
    res.send({ message: "Enter a numerical value as the ID" });
  }
};

exports.updateEmployee = (req, res) => {
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

exports.updateDepartment = (req, res) => {
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
      Department.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Department details were updated successfully.",
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
            message: "Error updating Department with id=" + id,
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

exports.deleteEmployee = (req, res) => {
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

exports.deleteDepartment = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;
    Department.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Department was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Department with id=${id}. Maybe Department was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Department with id=" + id,
        });
      });
  } else {
    res.send({ message: "ID should be a Number!" });
  }
};

exports.deleteAllEmployee = (req, res) => {
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

exports.deleteAllDepartment = (req, res) => {
  Department.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Departments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees.",
      });
    });
};

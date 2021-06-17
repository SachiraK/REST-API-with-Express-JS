const Sequelize = require("sequelize");
let validate = require("validate.js");

const db = require("../config/db.config");

const Department = db.departments;

const Op = Sequelize.Op;


exports.createDepartment = (req, res) => {
  // Validate request
  if (validate.isEmpty(req.body.department_name)) {
    res.status(400).send({
      message: "One or more field/fields is/are missing!",
    });
    return;
  }

  //Register a Department
  if (
    validate.isString(req.body.department_name)
  ) {
    const department = {
      department_name: req.body.department_name,
    };

    // Save Tutorial in the database
    Department.create(department)
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

exports.findAllDepartment = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Department.findAll({ 
    include:["employees"],
    where: condition })
    .then((data) => {
      res.send({ data: data, });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Department.",
      });
    });
};

exports.findOneDepartment = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;

    Department.findByPk(
      id,
      )
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

exports.findAllEmployeesForDepartment = (req, res) => {
    if (validate.isInteger(parseInt(req.params.id))){
        const id = req.params.id;

        Department.findAll({
            include:["employees"],
            where: {department_id : id},
        })
        .then((data) => {
            if (data === null){res.status(500).send(
                {message: `No employees for the department with ID ${id}`} 
            );
        }
        res.send(data);
        })
        .catch((err) => {
            res.status(500).send(
                {message: `Error retrieving employees for department with ID ${id}`}
            );
        });
    }else{res.send({
        message: "Enter valid ID"
    });}
};

exports.updateDepartment = (req, res) => {

  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;
    if (
      validate.isString(req.body.name) &&
      validate.isString(req.body.department) &&
      validate.isString(req.body.nic) &&
      req.body.nic.slice(-1).toLowerCase() === "v"
    ) {
      Department.update(req.body, {
        where: { department_id: id },
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

exports.deleteDepartment = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;
    Department.destroy({
      where: { department_id: id },
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



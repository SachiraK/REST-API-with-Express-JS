const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;

// // Create and Save a new employee
// exports.create = (req, res) => {
  
// };

// // Retrieve all employees from the database.
// exports.findAll = (req, res) => {
  
// };

// // Find a single employee with an id
// exports.findOne = (req, res) => {
  
// };

// // Update a employee by the id in the request
// exports.update = (req, res) => {
  
// };

// // Delete a employee with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// // Delete all employees from the database.
// exports.deleteAll = (req, res) => {
  
// };
//POST
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Employee
    const employee = {
      name: req.body.name,
      department: req.body.department,
      //published: req.body.published ? req.body.published : false
    };
  
    // Save Employee in the database
    Employee.create(employee)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };
//GET
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Employee.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

exports.findOne = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    const id = req.params.id;
  
    Employee.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Employee with id=" + id
        });
      });
  };

  //PUT
exports.update = (req, res) => {
    const id = req.params.id;
  
    Employee.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating employee with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Employee.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete employee with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete employee with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    Employee.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} employees were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all employees."
        });
      });
  };




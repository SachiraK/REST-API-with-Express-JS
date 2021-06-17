module.exports = (app) => {
  const employees = require("../controllers/employee.controller.js");

  let router = require("express").Router();

  router.post("/", employees.createEmployee);

  router.get("/", employees.findAllEmployee);

  router.get("/:id", employees.findOneEmployee);

  router.put("/:id", employees.updateEmployee);

  router.delete("/:id", employees.deleteEmployee);

  router.delete("/", employees.deleteAllEmployee);

  app.use("/api/employees", router);
};

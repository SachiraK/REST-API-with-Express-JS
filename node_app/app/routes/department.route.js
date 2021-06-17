module.exports = (app) => {
  const department = require("../controllers/department.controller.js");

  let router = require("express").Router();

  router.post("/", department.createDepartment);
 
  router.get("/", department.findAllDepartment);

  router.get("/:id", department.findOneDepartment);

  router.get("/:id/employees", department.findAllEmployeesForDepartment);

  router.put("/:id", department.updateDepartment);

  router.delete("/:id", department.deleteDepartment);

  router.delete("/", department.deleteAllDepartment);

  app.use("/api/department", router);
};

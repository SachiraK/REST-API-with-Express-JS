module.exports = (app) => {
  const department = require("../controllers/controller.js");

  let router = require("express").Router();

  // Create a new Tutorial
  router.post("/", department.createDepartment);

  // Retrieve all department
  router.get("/", department.findAllDepartment);

  // Retrieve a single Tutorial with id
  router.get("/:id", department.findOneDepartment);

  // Update a Tutorial with id
  router.put("/:id", department.updateDepartment);

  // Delete a Tutorial with id
  router.delete("/:id", department.deleteDepartment);

  // Delete all department
  router.delete("/", department.deleteAllDepartment);

  app.use("/api/department", router);
};

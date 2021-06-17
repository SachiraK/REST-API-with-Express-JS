const mysql = require ("mysql");
const express = require("express");
const bodyParser = require("body-parser");

var server = express();
// server.use(bodyParser.json());


var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Helik@0710311885"
//   database : "employee_management_system",
//   multipleStatements : true
});

mysqlConnection.connect(function(err) {
  if (!err) 
  {
  console.log("Connected!");
  }
  else{
      console.log("Connection failoed")
  }
});


server.listen(6000);
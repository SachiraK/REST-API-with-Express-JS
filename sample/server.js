const express = require('express');
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
const db = require("./app/models");
db.sequelize.sync({force: true}).then(() => {
    console.log("Re-sync db");
});

//parse requests of json type
app.use(express.json());

app.use(express.urlencoded({extended: true}));

//simple route
app.get("/", (req,res) => {
    res.json({message: "Welcome!!!"});
});

//listening for requests
require("./app/routes/employee.routes")(app)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
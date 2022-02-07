const mysql = require("mysql2");
const inquirers = require("./server");

const db = mysql.createConnection(
    {host: "localhost", user: "root", password: "mypassword", database: "employee_db"},
    console.log("CONNECTED TO EMPLOYEE DATABASE")
)

module.exports = {
    viewDep: () => db.promise().query("SELECT * FROM department"),
    viewRoles: () => db.promise().query("SELECT * FROM role"),
    viewEmp: () => db.promise().query("SELECT * FROM employee")
};
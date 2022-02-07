const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {hoost: "localhost", user: "root", password: "secret", database: "test"}
);

const menuOptions = ["What would you like to do?", "View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"];
const addDepPrompt = ["Enter the name of the department you want to add"];
const addRolePrompt = ["Enter the name of the role", "What's the salary for that role?", "What department does the role belongs to?"];
const addEmpPrompt = ["Enter employee's first name", "Enter employee's last name", "What's the employee's role?", "What's the employeer's manager?"];
const updEmpRolePrompt = ["Select an employee to update", "What is the employee's new role?"];

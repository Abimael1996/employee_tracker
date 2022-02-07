const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {host: "localhost", user: "root", password: "mypassword", database: "employee_db"},
    console.log("CONNECTED TO EMPLOYEE DATABASE")
)

const menuOptions = ["What would you like to do?", "View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"];
const addDepPrompt = ["Enter the name of the department you want to add"];
const addRolePrompt = ["Enter the name of the role", "What's the salary for that role?", "What department does the role belongs to?"];
const addEmpPrompt = ["Enter employee's first name", "Enter employee's last name", "What's the employee's role?", "What's the employeer's manager?"];
const updEmpRolePrompt = ["Select an employee to update", "What is the employee's new role?"];

const menuInquirer = (menuOptions) => {
    inquirer
      .prompt([
          {
              name: "options",
              type: "list",
              message: menuOptions[0],
              choices: [menuOptions[1], menuOptions[2], menuOptions[3], menuOptions[4], menuOptions[5], menuOptions[6], menuOptions[7], menuOptions[8]]
          }
      ])
      .then((option) => {
          switch (option.options) {
              case menuOptions[1]:
                  db.query("SELECT * FROM department", (err, results) =>
                  console.table(results));
                  menuInquirer(menuOptions);
                  break;
              case menuOptions[2]:
                  db.query("SELECT * FROM role", (err, results) =>
                  console.table(results));
                  menuInquirer(menuOptions);
                  break;
              case menuOptions[3]:
                  db.query("SELECT * FROM employee", (err, results) =>
                  console.table(results));
                  menuInquirer(menuOptions);
                  break;
              case menuOptions[8]:
                  console.log("Bye!");
                  break;
              default:
                  console.log("NOT YET BRO!");
          }
      })
}

  menuInquirer(menuOptions);
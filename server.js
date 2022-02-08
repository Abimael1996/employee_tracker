const inquirer = require("inquirer");
const Queries = require("./queries");
const queries = new Queries();

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
                  queries.viewDep()
                  .then(([rows,fields]) => {
                      console.table(rows);
                      menuInquirer(menuOptions);
                  })
                  break;
              case menuOptions[2]:
                  queries.viewRoles()
                  .then(([rows,fields]) => {
                      console.table(rows);
                      menuInquirer(menuOptions);
                  })
                  break;
              case menuOptions[3]:
                  queries.viewEmp()
                  .then(([rows,field]) => {
                      console.table(rows);
                      menuInquirer(menuOptions);
                  })
                  break;
              case menuOptions[4]:
                  addDepInquirer(addDepPrompt);
                  break;
              case menuOptions[8]:
                  console.log("Bye!");
                  break;
              default:
                  console.log("NOT YET BRO!");
          }
      })
}

const addDepInquirer = (addDepPrompt) => {
    inquirer
      .prompt([
          {
              name: "dep",
              type: "input",
              message: addDepPrompt[0]
          }
      ])
      .then((dep) => {
          const query = new Queries(dep.dep);
          query.addDep()
          .then(([rows,fields]) => {
              console.log("Departmend added");
              menuInquirer(menuOptions);
          })
      })
}

menuInquirer(menuOptions);

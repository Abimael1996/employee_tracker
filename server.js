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
              case menuOptions[5]:
                  addRoleInquirer(addRolePrompt);
                  break;
              case menuOptions[6]:
                  addEmpInquirer(addEmpPrompt);
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

const addRoleInquirer = (addRolePrompt) => {
    inquirer
      .prompt([
          {
              name: "title",
              type: "input",
              message: addRolePrompt[0]
          },
          {
              name: "salary",
              type: "input",
              message: addRolePrompt[1]
          },
      ])
      .then((answs) => {
          const {title, salary} = answs;
          queries.getDepId().then(([rows, fields]) => {
            const departments = rows.map((obj) => {
                return obj
            });
            inquirer
              .prompt(choicesPrompt("dep", addRolePrompt[2], departments))
              .then((dep) => {
                  console.log(dep);
                  console.log(departments);
                  for(const each of departments) {
                      const {name, id} = each;
                      if(name === dep.dep) {
                          const query = new Queries(title, salary)
                          query.addRole(id).then(([rows,fields]) => {
                            console.log("AHHHHHHHHHHHH!!!!!!!");
                            menuInquirer(menuOptions);
                        })
                          break;
                      }
                  }
              })
          })
      })
}

const addEmpInquirer = (addEmpPrompt) => {
    inquirer
      .prompt([
          {
              name: "fName",
              type: "input",
              message: addEmpPrompt[0]
          },
          {
              name: "lName",
              type: "input",
              message: addEmpPrompt[1]
          },
      ])
      .then((answ) => {
          const {fName, lName} = answ;
          queries.getRoleId().then(([rows,fields]) => {
              const roles = rows.map((obj) => {
                  return { name: obj.title, roleId: obj.id}
              });
              inquirer //role, addEmpPrompt2, roles
                .prompt(choicesPrompt("role", addEmpPrompt[2], roles))
                .then((role) => {
                    console.log(role);
                    console.log(roles);
                    for(const each of roles){
                        const {name, roleId} = each;
                        if(name === role.role) {
                            queries.getManId().then(([rows,fields]) => {
                                const emps = rows.map((obj) => {
                                    return { name: obj.last_name, manId: obj.id }
                                });
                                inquirer // man, emp3, emps
                                  .prompt(choicesPrompt("man", addEmpPrompt[3], emps))
                                  .then((man) => {
                                      console.log(man);
                                      console.log(emps);
                                      for(const mana of emps) {
                                          const { name, manId } = mana;
                                          if(name === man.man) {
                                              const query = new Queries(fName, lName, roleId, manId);
                                              query.addEmp().then(([rows,fields]) => {
                                                  console.log("Done!");
                                                  menuInquirer(menuOptions);
                                              })
                                              break;
                                          }
                                      }
                                  })
                            })
                        }
                    }
                })
          })
      })
}

menuInquirer(menuOptions);

const choicesPrompt = (name, prompt, choices) => {
    return [
        {
            name: name,
            type: "list",
            message: prompt,
            choices: choices
        }
    ]
}


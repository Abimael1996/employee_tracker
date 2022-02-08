const mysql = require("mysql2");

const db = mysql.createConnection(
    {host: "localhost", user: "root", password: "mypassword", database: "employee_db"},
    console.log("CONNECTED TO EMPLOYEE DATABASE")
)

class Queries {
    constructor(dep) {
        this.dep = dep;
    }

    viewDep() {
        return db.promise().query("SELECT id, name AS department FROM department")
    }

    viewRoles() {
        return db.promise().query("SELECT r.id, r.title, r.salary, d.name AS department FROM role AS r JOIN department AS d ON r.department_id = d.id")
    }

    viewEmp() {
        return db.promise().query("SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, m.last_name AS manager FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id JOIN role AS r ON e.role_id = r.id JOIN department AS d ON r.department_id = d.id")
    }

    addDep() {
        return db.promise().query('INSERT INTO department (name) VALUES (?)', this.dep)
    }
}

module.exports = Queries;
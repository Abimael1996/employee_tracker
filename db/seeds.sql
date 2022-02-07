INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Legal"),
("Finance");

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Lead", 100000, 1),
("Lead Engineer", 150000, 2),
("Legal Team Lead", 250000, 3),
("Account Manager", 160000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
("Peter", "Parker", 2),
("Jon", "Snow", 1),
("Harvey", "Dent", 3),
("Michael", "Corleone", 4);

UPDATE employee
SET manager_id = 4
WHERE id = 1;

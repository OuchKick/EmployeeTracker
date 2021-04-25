USE employeeTrackDB;
  
  
INSERT INTO department (name) VALUES ("Operations");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("IT");
INSERT INTO department (name) VALUES ("HR");


INSERT INTO role (title, salary, department_id) VALUES ("CEO", "250000.00", 1);
INSERT INTO role (title, salary, department_id) VALUES ("Head Market Director", "210000.00", 2);
INSERT INTO role (title, salary, department_id) VALUES ("Analyst", "150000.00", 3);
INSERT INTO role (title, salary, department_id) VALUES ("Web Developer", "130000.00", 4);
INSERT INTO role (title, salary, department_id) VALUES ("HR Representative", "100000.00", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Doug", "Davis", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jen", "Tiblo", 2, 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Kilber", "Tin", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Fin", "Opera", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Nelsa", "Ioni", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Aruja", "Wojteck", 5);



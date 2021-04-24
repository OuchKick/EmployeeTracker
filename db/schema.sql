  CREATE DATABASE employeeTrackDB;

  USE employeeTrackDB;
  
  
CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
    );
 
CREATE TABLE role (
      id INT NOT NULL,
      title VARCHAR(30) NULL,
      salaray DECIMAL,
      department_id INT,
      PRIMARY KEY (id)
    );


CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL
    );



SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
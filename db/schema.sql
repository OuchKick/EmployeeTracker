  CREATE DATABASE employeeTrackDB;

  USE employeeTrackDB;
  
  
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
    );
 
CREATE TABLE role (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(30) NULL,
      salary DECIMAL(10,2),
      department_id INT,
      PRIMARY KEY (id),
      FOREIGN KEY (department_id) REFERENCES department(id)
    );


CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    );


SELECT * FROM employeeTrackDB;

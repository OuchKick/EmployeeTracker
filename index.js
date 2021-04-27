const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Lemonwedge992',
  database: 'employeeTrackDB',
});

const runApp = () => {
  inquirer
    .prompt({
      name: 'decisions',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Departments',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit'
      ],
    })
    .then((answer) => {
      console.log(answer);
      switch (answer.decisions) {
        case 'View All Employees':
          viewEmployees();
          break;

        case 'View All Departments':
          viewByDepartment();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        case 'Exit':
          console.log('Exiting..');
          connection.end();
          break;


      }
    });
};


// Brings up EVERYTHING
const viewEmployees = () => {
  console.log('=================== EMPLOYEES ===================');
  const query = `SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS Employee_Name, role.title AS Title, role.salary AS Salary, department.name AS Department
  from employee
  left join role 
  on employee.role_id = role.id
  left join department 
  on role.department_id = department.id
  order by employee.id;`
  connection.query(query, (err, data) => {
    if (err) throw (err)
    console.table(data);
    return runApp();
  });
};


//brings up all departments
const viewByDepartment = () => {
  const query = `SELECT * FROM department`
  connection.query(query, (err, res) => {
    if (err) throw (err);
    const display = res.map(department => {
      return {
        departments: department.name,
        departmentID: department.id

      }
    });

    console.table(display);
    return runApp();
  });
};


// Add a  new department for the company
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'department',
        type: 'input',
        message: 'Enter the name of the department you would like to add:'
      }
    ]).then((answer => {
      const query = `INSERT INTO department (name) VALUES ('${answer.department}')`
      connection.query(query, (err, res) => {
        if (err) throw (err);
        connection.query("SELECT * FROM employeeTrackDB.department;", (err, res) => {
          if (err) throw (err);
          console.table(res);
          console.log(`${answer.department} has been added!`);
          return runApp();
      });
    });
  }));
};



// Add a new role for an employee in a department
addRole = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw (err);
    const departments = res.map((department) => {
      return {
        name: department.name,
        value: department.id
      }
    })
    inquirer
      .prompt([
        {
          name: 'role',
          type: 'input',
          message: "Enter the name of the role:"
        },
        {
          name: 'salary',
          type: 'input',
          message: "What is the salary?"
        },
        {
          name: 'department',
          type: 'list',
          message: "Which department should this role be in?",
          choices: departments
        },
      ]).then((answer => {

        const query = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.role}', '${answer.salary}', '${answer.department}')`
        connection.query(query, (err, res) => {
          if (err) throw (err);
          connection.query("SELECT * FROM employeeTrackDB.role;", (err, res) => {
            if (err) throw (err);
            console.table(res)
            console.log(`${answer.role} has been added!`)
            return runApp();
        });
      });
    }));
  });
};

// Add a new employee to the system - first name/last name etc.
const addEmployee = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw (err);
    const displayRoleC = res.map((role) => {
      return {
        name: role.title,
        value: role.id
      }
    })
    inquirer
      .prompt([
        {
          name: 'first',
          type: 'input',
          message: "Enter Employees first name:"
        },
        {
          name: 'last',
          type: 'input',
          message: "Enter Employees last name:"
        },
        {
          name: 'role',
          type: 'list',
          message: "Which department should this role be in?",
          choices: displayRoleC
        },
      ]).then((answer => {

        const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.first}', '${answer.last}', '${answer.role}')`
        connection.query(query, (err, res) => {
          if (err) throw (err);
          connection.query("SELECT * FROM employeeTrackDB.employee;", (err, res) => {
            if (err) throw (err);
            console.table(res)
            console.log(`${answer.first} ${answer.last} has been added!`)
            return runApp();
          });
       });
    }));
  });
};


// Employee has a new title/job at the company, needs his Role updated
const updateEmployeeRole = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw (err);
    const employees = res.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }
    })
    connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw (err);
      const roles = res.map((role) => {
        return {
          name: role.title,
          value: role.id
        }
      })
      inquirer
        .prompt([
          {
            name: 'employee',
            type: 'list',
            message: "Which Employee is changing roles?",
            choices: employees
          },
          {
            name: 'role',
            type: 'list',
            message: "What is their new role?",
            choices: roles
          },
        ]).then((answer => {
          const query = `
              UPDATE employee
              SET role_id = ${answer.role}
              WHERE id=${answer.employee};`
          connection.query(query, (err, res) => {
            if (err) throw err
            connection.query("SELECT * FROM employeeTrackDB.employee;", (err, res) => {
              if (err) throw (err);
              console.table(res)
              console.log(`Role has been updated!`)
              return runApp();
          });
        });
      }));
    });
  });
};


connection.connect((err) => {
  if (err) throw (err);
  console.log(`connected as ${connection.threadId}`);
  runApp();
});

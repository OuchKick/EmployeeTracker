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
    if (err) throw err
    console.table(data);
});
};


//brings up all departments
const viewByDepartment = () => {
  const query = `SELECT * FROM department`
  connection.query(query, (err, res) => {
    if (err) throw err;
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
        if (err) throw err;
        connection.query("SELECT * FROM employeeTrackDB.department;", (err, res) => {
          if (err) throw err;
          console.table(res);
          console.log(`${answer.department} has been added!`);
          return runApp();
        });
      });
    }));
};



// Add a new role for an employee in a department
const addRole = () => {
    connection.query("SELECT * FROM department", (err, res) => {
      if (err) throw err;
      const display = res.map((department) => {
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
          message: 'Enter the name of the role you want to add:'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'How much does this role pay?'
      },
      {
        name: 'department',
        type: 'list',
        message: 'Which department does this role fall into?',
        choices: display
      },

    ]).then((answer => {
      const query = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.role}', '${answer.salary}', '${answer.department}')`
      connection.query(query, (err, res) => {
        if (err) throw err;
        connection.query("SELECT * FROM employeeTrackDB.role;", (err, res) => {
          if (err) throw err;
          console.table(res);
          console.log(`${answer.role} has been added!`);
          return runApp();
        });
      });
    }));
  })
  };

    
  










// Add a new employee to the system - first name/last name etc.
const addEmployee = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    const display = res.map((role) => {
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
        message: 'Enter Employees first name:'
    },
    {
      name: 'last',
      type: 'input',
      message: 'Enter Employees last name:'
    },
    {
      name: 'roleChoice',
      type: 'list',
      message: 'What role does this Employee fill?',
      choices: display
    },
  ]).then((answer => {
    const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.first}', '${answer.last}', '${answer.roleChoice})`
    connection.query(query, (err, res) => {
      if (err) throw err;
      connection.query("SELECT * FROM employeeTrackDB.employee;", (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log(`${answer.first} ${answer.last} has been added!`);
        return runApp();
      });
    });
  }));
})
};


// Employee has a new title/job at the company, needs his Role updated
const updateEmployeeRole = () => {







};








connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as ${connection.threadId}`);
  runApp();
});

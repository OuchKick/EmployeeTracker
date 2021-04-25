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
  password: '',
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
          'View All Employees By Department',
          'Add Department',
          'Add Role',
          'Add Employee',
          'Update Employee Role',
          'Exit'
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View All Employees':
            viewEmployees();
            break;
  
          case 'View All Employees By Department':
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
          
            default: 
            console.log('Exiting..')
              break;
        }
      });
};


// Brings up entire Employee table
const viewEmployees = () => {







};


// Focuses on Department, brings up all employees with the department they work in
const viewByDepartment = () => {







};


// Add a a new department for the company
const addDepartment = () => {







};



// Add a new role for an employee in a department
const addRole = () => {







};


// Add a new employee to the system - first name/last name etc.
const addEmployee = () => {







};


// Employee has a new title/job at the company, needs his Role updated
const updateEmployeeRole = () => {







};








connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as ${connection.threadId}`);
});
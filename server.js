const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;

// Creates the connection to database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '****!',
    database: 'employees'
  });
  
  connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    start();
  });
  
  afterConnection = () => {
    connection.query('SELECT * FROM employee', function(err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
};


// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
//Add Employee Questions
const addEmp = [
    {type: 'input',
     message: 'What is the employees first name?',
     name: 'first_name'},

    {type: 'input',
     message: 'What is the employees last name?',
     name: 'last_name'},

    {type: 'list',
     message: 'What is the employees role?',
     name: 'role',
     choices: ['Software Developer', 'Accountant', 'CEO', 'CMO', 'Account Manager', 'Sales Representative', 'Administor', 'IT Service Desk']}
];

//Update Employee Role Questions
const updEmp = [
    {type: 'list',
     message: 'Which employee do you want to update?',
     name: 'updateEmp',
     choices: ['Jane Smith', 'Alice Kelley','Hunter Rogers', 'Joshua Phillips', 'Denise Moscato', 
      'Raymond Williams', 'Penelope Tanture', 'Oscar Pharon', 'Trevor Ferrell', 'Matt Denter', 'Jordan Ballin']},
    {type: 'list',
     message: 'What is their new role?',
     name: 'updateRole',
     choices: ['Software Developer', 'Accountant', 'CEO', 'CMO', 'Account Manager', 'Sales Representative', 'Administor', 'IT Service Desk']}
];


// Prompt the user
function start (){
    inquirer
  .prompt(
    {type: 'list',
      message: 'What would you like to do?',
      name: 'start',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role']
    }).then(function(answers) {
        if (answers.start == 'View All Employees'){
            fullTable();
            start();

        } else if (answers.start == 'Add Employee'){
            inquirer.prompt(addEmp)
            .then(data => createEmp(data)
            )

        } else if (answers.start == 'Update Employee Role'){
            inquirer.prompt(updEmp)
            .then(data => updateEmp(data));
                }
            } 
            
  ); 
    };

    function fullTable (){
        connection.query(`SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        roles.title, 
        department.name, 
        roles.salary,
        employee.manager_id AS manager
    FROM employee
    INNER JOIN roles ON employee.role_id = roles.id
    INNER JOIN department ON roles.department_id = department.id `, function(err, res) {
          console.table(res);
        });
    };

    const createEmp = (data) => {
        //console.log('*** Inserting a new product...\n');
        if (data.role  == 'Software Developer'){
            new_role= 1;
        } else if (data.role  == 'Accountant'){
            new_role= 2;
        } else if (data.role  == 'CEO'){
            new_role= 3;
        } else if (data.role  == 'CMO'){
            new_role= 4;
        } else if (data.role  == 'Account Manager'){
            new_role= 5;
        } else if (data.role  == 'Sales Representative'){
            new_role= 6;
        } else if (data.role  == 'Administor'){
            new_role= 7;
        } else if (data.role  == 'IT Service Desk'){
            new_role= 8;
        };

        const newEmployee = {
          first_name: data.first_name,
          last_name: data.last_name,
          role_id: new_role
        };
        const query = connection.query('INSERT INTO employee SET ?', newEmployee, employeeCreated);
        console.table(query.sql);
      };
      const employeeCreated = (err, res) => {
        if (err) throw err;
       start();
      }

    const updateEmp = (data) => {
        if (data.updateEmp == 'Jane Smith'){
            emp_id= 1;
        } else if (data.updateEmp == 'Alice Kelley'){
            emp_id= 2;
        } else if (data.updateEmp == 'Hunter Rogers'){
            emp_id= 3;
        } else if (data.updateEmp == 'Joshua Phillips'){
            emp_id= 4;
        } else if (data.updateEmp == 'Denise Moscato'){
            emp_id= 5;
        } else if (data.updateEmp == 'Raymond Williams'){
            emp_id= 6;
        } else if (data.updateEmp == 'Penelope Tanture'){
            emp_id= 7;
        } else if (data.updateEmp == 'Oscar Pharon'){
            emp_id= 8;
        } else if (data.updateEmp == 'Trevor Ferrell'){
            emp_id= 9;
        } else if (data.updateEmp == 'Matt Dente'){
            emp_id= 9;
        } else if (data.updateEmp == 'Jordan Ballin'){
            emp_id= 9;
        };

        if (data.updateRole  == 'Software Developer'){
            new_role= 1;
        } else if (data.updateRole  == 'Accountant'){
            new_role= 2;
        } else if (data.updateRole  == 'CEO'){
            new_role= 3;
        } else if (data.updateRole  == 'CMO'){
            new_role= 4;
        } else if (data.updateRole  == 'Account Manager'){
            new_role= 5;
        } else if (data.updateRole  == 'Sales Representative'){
            new_role= 6;
        } else if (data.updateRole  == 'Administor'){
            new_role= 7;
        } else if (data.updateRole  == 'IT Service Desk'){
            new_role= 8;
        };
        const query = connection.query('UPDATE employee SET ? WHERE ?', [ { role_id: new_role }, { id: emp_id}], roleUpdated);
      };
      const roleUpdated = (err, res) => {
        if (err) throw err;
        start();
      };

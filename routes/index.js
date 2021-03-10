const fs = require('fs');
const inquirer = require('inquirer');
const express = require('express');
const router = express.Router();
const empRout = require('./employeeRoutes');
const db = require('../db/database');


router.use(require('./departmentRoutes'));
router.use(require('./employeeRoutes'));
router.use(require('./roleRoutes'));

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
        //console.log(answers);
       // nextOptions(answers)
        if (answers.start == 'View All Employees'){
            console.log(answers);
            //displayEmps();
            displayEmployees();
            router.get('/employee', (req, res) => {
                const sql = `SELECT 
                                employee.id, 
                                employee.first_name, 
                                employee.last_name, 
                                roles.title, 
                                department.name, 
                                roles.salary,
                                employee.manager_id AS manager
                            FROM employee
                            INNER JOIN roles ON employee.role_id = roles.id
                            INNER JOIN department ON roles.department_id = department.id ;`;
                const params = [];
                db.all(sql, params, (err, rows) => {
                  if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                  }
              
                  res.json({
                    message: 'success',
                    data: rows
                  });
                });
              })
            //afterConnection();
            start();

        } else if (answers.start == 'Add Employee'){
            inquirer.prompt(addEmp)
           // .then(addEmployee()
            //.then(start()
            //)
            ;

        } else if (answers.start == 'Update Employee Role'){
            inquirer.prompt(updEmp)
            //.then(updEm());
            //run follow up Qs
                }
            }
  );
    };


start();

module.exports = router;
const fs = require('fs');
const inquirer = require('inquirer');
const express = require('express');
const router = express.Router();

router.use(require('./departmentRoutes'));
router.use(require('./employeeRoutes'));
router.use(require('./roleRoutes'));

//Add Employee Questions
const addEmp = [
    {type: 'input',
     message: 'What is the employees first name?',
     name: 'contact'},

    {type: 'input',
     message: 'What is the employees last name?',
     name: 'contact'},

    {type: 'list',
     message: 'What is the employees role?',
     name: 'start',
     choices: ['View All Employees', 'Add Employee', 'Update Employee Role']}
 ];

//Update Employee Role Questions
const updEmp = [
    {type: 'list',
     message: 'Which employee do you want to update?',
     name: 'updateEmp',
     choices: ['View All Employees', 'Add Employee', 'Update Employee Role']},

    {type: 'list',
     message: 'What is their new role?',
     name: 'updateRole',
     choices: ['View All Employees', 'Add Employee', 'Update Employee Role']}
];

// Prompt the user
function start (){
    inquirer
  .prompt(
    {type: 'list',
      message: 'What would you like to do?',
      name: 'start',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role']
    }).then(answers=>
        function nextOptions(answers){
            console.log(answers);
            // if (answers.start == 'View All Employees'){
            //     //then run view employy table
            // } else if (answers.start == 'Add Employee'){
            //     //run follow up Qs
            //     inquirer.prompt(addEmp)
            //     .then(data=>
            //         //update data table
            //     );
            // } else if (answers.start == 'Update Employee Role'){
            //     inquirer.prompt(updEmp)
            //     .then(data=>);
            //     //run follow up Qs
            // }
        }
        
  );
    };
    start();
// Write the user response to a file by chaining the below callback method to the prompt above.
//.then(function(data) {
    // Bonus: Generate the name of your user file from their input
//     const filename =
//       data.name
//         .toLowerCase()
//         .split(' ')
//         .join('') + '.json';

//     fs.writeFile(filename, JSON.stringify(data, null, '\t'), function(err) {
//       if (err) {
//         return console.log(err);
//       }

//       console.log('Success!');
//     });
//   });


module.exports = router;
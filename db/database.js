// const express = require('express');
// const mysql = require('mysql2');
// //node console table
// const cTable = require('console.table');

// //const db = require('./db/database');

// const PORT = process.env.PORT || 3001;
// const app = express();

// const routes = require('./routes');

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Creates the connection to database
// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     port: 3306,
//     // Your MySQL username
//     user: 'root',
//     // Your MySQL password
//     password: 'Fockey226!',
//     database: 'employees'
//   });
  
//   connection.connect(err => {
//     if (err) throw err;
//     console.log('connected as id ' + connection.threadId);
//     //afterConnection();
//     //displayEmps();
//   });
  
//   afterConnection = () => {
//     connection.query('SELECT * FROM employee', function(err, res) {
//       if (err) throw err;
//       console.log(res);
//       connection.end();
//     });
//   };
  
// // GIVEN a command-line application that accepts user input
// // WHEN I start the application
// // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role



// // Default response for any other request(Not Found) Catch all
// app.use((req, res) => {
//     res.status(404).end();
//   }); 
  
//   // Start server after DB connection
//   db.on('open', () => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   });

//   module.exports = db;
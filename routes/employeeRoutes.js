const express = require('express');
const router = express.Router();
const db = require('../db/database');
const inputCheck = require('../utils/inputCheck');

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function displayEmps (){router.get('/employee', (req, res) => {
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
};
  
// Get single candidate
router.get('/employee/:id', (req, res) => {
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
                INNER JOIN department ON roles.department_id = department.id  
                WHERE employee.id = ?`;
    
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: row
      });
    });
  });
  
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
router.post('/employee', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql =  `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                  VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    // ES5 function, not arrow function, to use this
    db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: body,
        id: this.lastID
      });
    });
  });
  
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
router.put('/employee/:id', (req, res) => {
        const errors = inputCheck(req.body, 'party_id');
        if (errors) {
          res.status(400).json({ error: errors });
          return;
        }
      
        const sql = `UPDATE employee SET role_id = ? 
                     WHERE id = ?`;
        const params = [req.body.party_id, req.params.id];
        // function,not arrow, to use this
        db.run(sql, params, function(err, result) {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
      
          res.json({
            message: 'success',
            data: req.body,
            changes: this.changes
          });
        });
      });
  
 displayEmps ();

  
  module.exports = router;

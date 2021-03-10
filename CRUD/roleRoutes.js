// const express = require('express');
// const router = express.Router();
const db = require('../db/database');
const inputCheck = require('../utils/inputCheck');

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
router.get('/roles', (req, res) => {
    const sql = `SELECT 
                    roles.id, 
                    roles.title,
                    department.name AS department, 
                    roles.salary
                FROM roles
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
  });

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
router.post('/roles', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql =  `INSERT INTO roles (title, salary, department_id) 
                  VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];
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
  

module.exports = router;
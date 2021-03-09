const express = require('express');
const router = express.Router();
const db = require('../db/database');
const inputCheck = require('../utils/inputCheck');


// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
router.get('/department', (req, res) => {
    const sql = `SELECT 
                    name, 
                    id
                FROM department;`;
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

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
router.post('/department', ({ body }, res) => {
    const errors = inputCheck(body, 'name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql =  `INSERT INTO department (name) 
                  VALUES (?)`;
    const params = [body.name];
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
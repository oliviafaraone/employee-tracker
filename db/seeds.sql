INSERT INTO department (id, name)
VALUES
(1, 'IT'),
(2, 'Marketing'),
(3, 'Management'),
(4, 'Finance'),
(5, 'HR')
;

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, 'Software Developer','100000', 1),
(2, 'Accountant','90000', 4),
(3, 'CEO','200000', 3),
(4, 'CMO','180000', 3),
(5, 'Account Manager','70000', 2),
(6, 'Sales Representative','50000', 2),
(7, 'Administor','60000', 5),
(8, 'IT Service Desk','55000', 1)
;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'Jane','Smith', 1, 3),
(2, 'Alice','Kelley', 2, 4),
(3, 'Hunter','Rogers', 3, 5),
(4, 'Joshua','Phillips', 4, 2),
(5, 'Denise','Moscato', 5, 1),
(6, 'Raymond','Williams', 6, 7),
(7, 'Penelope','Tanture', 7, 3),
(8, 'Oscar','Pharon', 8, 4),
(9, 'Trevor','Ferrell', 1, 3),
(10, 'Matt','Denter', 8, 4),
(11, 'Jordan','Ballin', 6, 3)
;
INSERT INTO department (name)
VALUES
('IT'),
('Marketing'),
('Management'),
('Finance'),
('HR')
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jane','Smith', 1, 3),
('Alice','Kelley', 2, 4),
('Hunter','Rogers', 3, 6),
('Joshua','Phillips', 4, 2),
('Denise','Moscato', 5, 5),
('Raymond','Williams', 6, 7),
('Penelope','Tanture', 7, 3),
('Oscar','Pharon', 8, 4),
('Trevor','Ferrell', 1, 3),
('Matt','Denter', 8, 4),
('Jordan','Ballin', 6, 3)
;

INSERT INTO roles (title, salary, department_id)
VALUES
('Software Developer','100000', 1),
('Accountant','90000', 4),
('CEO','200000', 3),
('CMO','180000', 3),
('Account Manager','70000', 2),
('Sales Representative','50000', 2),
('Administor','60000', 5),
('IT Service Desk','55000', 1)
;

USE tracker_db;

INSERT INTO department(name)
 VALUES 
('Marketing'), 
('Finance'), 
('Human Resources'),
('Sales'),
('IT');

INSERT INTO role(title, salary, department_id)
 VALUES 
('Marketing Manager', 75000.00, 1), 
('Coordinator', 65000.00, 3), 
('Analyst', 80000.00, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
 VALUES 
('John', 'Smith', 4, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
 VALUES 
('Jane', 'Doe', 1, 1);


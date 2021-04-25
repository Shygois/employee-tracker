const mysql = require('mysql2');
const inquirer = require("inquirer");

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'tracker_db'
});

// simple query
// connection.query(
//     'SELECT * FROM `employee`',
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // results contains rows returned by server
//     }
//   );

// connection.end();

// Main Menu
const mainMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Quit']
        }
    ])
        .then((response) => {
            console.log('You selected ' + response.option + '.')

            switch (response.option) {
                case 'View all departments':
                    viewDepartments();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Update employee role':
                    updateEmployeeRole();
                    break;

                default:
                    console.log('Goodbye!');
                    connection.end();
            }
        })
};

// View all departments
const viewDepartments = () => {
    connection.query(
        'SELECT * FROM `department`',
        (err, results) => {
            if (err) throw err;
            console.table(results);
            mainMenu();
        }
    );
};

// Add a department
const addDepartment = () => {
    inquirer.prompt(
        {
            type: "input",
            name: "department",
            message: "Please enter department name.",
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('You must specify a department name!');
                    return false;
                }
            }
        }
    )
        .then(({ department }) => {
            connection.query(
                `INSERT INTO department(name) VALUES ('${department}')`,
                (err) => {
                    if (err) throw err;
                    viewDepartments();
                }
            );
        })
};

// View all roles
const viewRoles = () => {
    connection.query(
        'SELECT * FROM `role`',
        (err, results) => {
            if (err) throw err;
            console.table(results);
            mainMenu();
        }
    );
};

// Add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Please enter new role.",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("You must specify the new role!");
                    return false;
                }
            },
            type: "input",
            name: "salary",
            message: "Please enter salary for the new role.",
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log("You must specify a salary for this role!");
                    return false;
                }
            },
            type: "input",
            name: "department_id",
            message: "Please enter department id for the new role.",
            validate: department_idInput => {
                if (department_idInput) {
                    return true;
                } else {
                    console.log("You must specify the department id for this role!");
                    return false;
                }
            }
        }
    ])
        .then(({ role }) => {
            connection.query(
                `INSERT INTO role(title, salary, department_id) VALUES ('${role}')`,
                (err) => {
                    if (err) throw err;
                    viewRoles();
                }
            );
        })
};

// View all employees
const viewEmployees = () => {
    connection.query(
        'SELECT * FROM `employee`',
        (err, results) => {
            if (err) throw err;
            console.table(results);
            mainMenu();
        }
    );
};

// Add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "Please enter employee's first name.",
            validate: firstnameInput => {
                if (firstnameInput) {
                    return true;
                } else {
                    console.log("You must specify the employee's first name!");
                    return false;
                }
            },
            type: "input",
            name: "lastname",
            message: "Please enter employee's last name.",
            validate: lastnameInput => {
                if (lastnameInput) {
                    return true;
                } else {
                    console.log("You must specify the employee's last name!");
                    return false;
                }
            },
            type: "input",
            name: "role_id",
            message: "Please enter the employee's role id.",
            validate: role_idInput => {
                if (role_idInput) {
                    return true;
                } else {
                    console.log("You must specify the role id for this employee!");
                    return false;
                }
            },
            type: "input",
            name: "manager_id",
            message: "Please enter the employee's manager id (if applicable).",
            validate: manager_idInput => {
                if (manager_idInput) {
                    return true;
                } else {
                    console.log("You must specify the manager id for this role!");
                    return false;
                }
            }
        }
    ])
        .then(({ employee }) => {
            connection.query(
                `INSERT INTO role(firstname, lastname, role_id, manager_id) VALUES ('${employee}')`,
                (err) => {
                    if (err) throw err;
                    viewEmployees();
                }
            );
        })
};

// Update employee role
const updateEmployeeRole = () => {
    connection.query(
        'SELECT * FROM `employee`',
        (err, results) => {
            if (err) throw err;
            console.table(results)
            let employees = results.map(employee => {
                console.log(employee.first_name);
                console.log(employee.last_name);
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                };
            });
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Which employee would you like to update?',
                    choices: employees
                }
            ])
                .then(({ employeeId }) => {
                    let employee_id = (employeeId);
                    connection.query(
                        'SELECT * FROM `role`',
                        (err, results) => {
                            if (err) throw err;
                            console.table(results)
                            let roles = results.map(role => {
                                console.log(role.title);
                                console.log(role.salary);
                                console.log(role.department_id);
                                return {
                                    name: role.title,
                                    value: role.id
                                };
                            });
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'roleId',
                                    message: 'Which role would you like to assign to this employee?',
                                    choices: roles
                                }
                            ])
                                .then(({ roleId }) => {
                                    connection.query(
                                        `UPDATE employee 
                                SET 
                                    role_id = ${roleId}
                                WHERE
                                    id = ${employee_id};`,
                                        (err, results) => {
                                            if (err) throw err;
                                            viewEmployees();
                                        }
                                    )
                                })
                        }
                    )
                })
        }
    );
};

mainMenu();
const inquirer = require('inquirer')
const db = require('./db')
require('console.table');

function start() {

    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
    }).then((res) => {
        switch (res.choice) {
            case 'view all departments':
                viewDepartments()
                break;
            case 'view all roles':
                viewRoles()
                break;
            case 'view all employees':
                viewEmployees()
                break;
            case 'add a department':
                addDepartment()
                break;
            case 'add a role':
                addRole()
                break;
            case 'add an employee':
                addEmployee()
                break;
            case 'update an employee role':
                updateEmployee()
                break;
            default:
                process.exit()
                break;
        }
    })
}

function viewDepartments() {
    db.returnAllDepartments().then(([data]) => {
        console.table(data)
    }).then(() => start());
}

function viewRoles() {
    db.returnAllRoles().then(([data]) => {
        console.table(data)
    }).then(() => start());
}

function viewEmployees() {
    db.returnAllRoles().then(([data]) => {
        console.table(data)
    }).then(() => start());
}

start()
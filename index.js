const inquirer = require('inquirer');
const { returnAllRoles } = require('./db');
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
                updateEmployeeRole()
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
    db.returnAllEmployees().then(([data]) => {
        console.table(data)
    }).then(() => start());
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'what is the department name?',
            name: 'departmentName'
        }
    ]).then(res => {
        db.insertDepartment(res.departmentName).then(([data]) => {
            console.table(data)
        }).then(() => start());
    })

}

function addRole() {
    db.returnAllDepartments().then(([data]) => {
        const departmentOptions = data.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the role name?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the role salary?',
                name: 'salary'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'what department does this new role belong to?',
                choices: departmentOptions
            }

        ]).then(res => {
            db.insertRole(res).then(() => start())
        })


    })


}

function addEmployee() {


    inquirer.prompt([
        {
            type: 'input',
            message: 'what is the employee first name?',
            name: 'employeeFirstName'
        },
        {
            type: 'input',
            message: 'what is the employee last name?',
            name: 'employeeLastName'
        },

    ]).then(res => {
        const firstName = res.employeeFirstName;
        const lastName = res.employeeLastName;

        db.returnAllRoles().then(([data]) => {
            const roleOptions = data.map(({ id, title }) => ({
                name: title,
                value: id
            }));


            inquirer.prompt([
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'What is the employee role?',
                    choices: roleOptions
                }
            ]).then((answer) => {
                const roleId = answer.roleId;

                db.returnAllEmployees().then(([data]) => {
                    const managerOptions = data.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));


                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'managerId',
                            message: 'Who is the employee manager?',
                            choices: managerOptions
                        }
                    ]).then((res) => {

                        const newEmployee = {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: roleId,
                            manager_id: res.managerId
                        }


                        db.insertEmployee(newEmployee).then(() => start())
                    })
                })

            })
        })
    })
}



function updateEmployeeRole() {
    db.returnAllEmployees().then(([data]) => {
        const employeeOptions = data.map(({ first_name, last_name, id }) => ({
            //It is {property: variable}. On the left is the name of the property you want to retrieve and on the right is the name of the variable you want to put that value into.
            name: `${first_name} ${last_name}`,
            value: id
        }));
        //console.log({employeeOptions})
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Which employee would you like to update?',
                choices: employeeOptions,
            }

        ]).then((answer) => {
            const employee = answer.updateEmployee;

            db.returnAllRoles().then(([data]) => {
                const roleOptions = data.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleUpdate',
                        message: 'What is the new employee role?',
                        choices: roleOptions
                    }
                ]).then((res) => {

                    const newEmployeeRole = {
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        role_id: res.roleId,
                        //manager_id: manager_id
                    }


                    db.insertEmployeeNewRole(newEmployeeRole).then(() => start())

                })
            })
        })
    }
    )
}


start()
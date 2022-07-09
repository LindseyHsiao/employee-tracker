const connection = require('./connection')

class Data {
    constructor(connection) {
        this.connection = connection
    }

    returnAllDepartments() {
        return this.connection.promise().query('SELECT * FROM department;')
    }

    //the role select statement nees to return the following columns: job title, role id, the department that role belongs to, and the salary for that role
    returnAllRoles() {
        return this.connection.promise().query('SELECT role.title, role.id, department.name, role.salary  FROM role LEFT JOIN department ON role.department_id = department.id;')
    }

    //employees select statement need the following columns: employee ids, first names, last names, job titles, departments, salaries, and managers full name that the employees report to -- How to join info from other tables?

    returnAllEmployees() {
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON manager.id = employee.manager_id;')
     }

     insertDepartment(departmentName) {
        return this.connection.promise().query('INSERT INTO department (name) VALUES (?)', [departmentName])
     }
    
     insertRole(role) {
        return this.connection.promise().query('INSERT INTO role SET ?', role)
     }
    
     insertEmployee(employee) {
        return this.connection.promise().query('INSERT INTO employee SET ?', employee)
     }

     insertEmployeeRole(updatedRole){
        return this.connection.promise().query('INSERT INTO employee SET ?', updatedRole)
     }
     
}

module.exports = new Data(connection)
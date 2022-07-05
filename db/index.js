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
        return this.connection.promise().query('SELECT title, id, department, salary  FROM role;')
    }

    //employees select statement need the following columns: employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to -- How to join info from other tables?

    returnAllEmployees() {
        return this.connection.promise().query('SELECT id, first_name, last_name FROM employee;'
        //LEFT JOIN title, salary FROM role
        // LEFT JOIN id FROM department
        )
     }

    

}

module.exports = new Data(connection)
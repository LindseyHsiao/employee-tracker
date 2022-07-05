INSERT INTO department (name)
VALUES 
    ('Home'), 
    ('Silverware'), 
    ('Candles'), 
    ('Towels');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Home Manager', 78000.00, 1), 
    ('Home Sales', 50000.00, 1), 
    ('Silverware Manager', 78000.00, 2), 
    ('Silverware Sales', 50000.00, 2),
    ('Candles Manager', 78000.00, 3), 
    ('Candles Sales', 50000.00, 3),
    ('Towels Manager', 78000.00, 4), 
    ('Towels Sales', 50000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Darth', 'Vader', 1, NULL),
    ('Luke', 'Skywalker', 2, 1),
    ('Edward', 'Scissorhands', 3, NULL),
    ('Winona', 'Ryder', 4, 3),
    ('Indiana', 'Jones', 5, NULL),
    ('Captain', 'Hook', 6, 5),
    ('Mickey', 'Mouse', 7, NULL),
    ('Minnie', 'Mouse', 8, 7);
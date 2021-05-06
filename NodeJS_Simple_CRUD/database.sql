CREATE DATABASE employee;

CREATE TABLE emp_info(
    emp_id SERIAL PRIMARY KEY,
    emp_name VARCHAR(50),
    emp_email VARCHAR(50),
    emp_grade VARCHAR(50),
    emp_dept VARCHAR(50),
    emp_contact INT

);
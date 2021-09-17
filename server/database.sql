-- Create Database
CREATE DATABASE todo_database;

--\c into todo_database

CREATE TABLE todo_database (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
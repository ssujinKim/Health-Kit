CREATE TABLE users (
    email VARCHAR(45) NOT NULL PRIMARY KEY,
    nickname VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    age INT NOT NULL,
    height INT NOT NULL,
    weight INT NOT NULL,
    gender VARCHAR(15) NOT NULL
);
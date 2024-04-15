-- Active: 1713080402198@@127.0.0.1@3306@healthkit
CREATE TABLE users (
    email VARCHAR(45) NOT NULL PRIMARY KEY,
    nickname VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    age INT NOT NULL,
    height INT NOT NULL,
    weight INT NOT NULL,
    gender VARCHAR(15) NOT NULL,
    disease1 VARCHAR(15),
    disease2 VARCHAR(15),
    disease3 VARCHAR(15),
    medicine1 VARCHAR(25),
    medicine2 VARCHAR(25),
    medicine3 VARCHAR(25)
);

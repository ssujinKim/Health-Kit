-- Active: 1713080402198@@127.0.0.1@3306@healthkit
CREATE TABLE users (
    email VARCHAR(45) NOT NULL PRIMARY KEY,
    nickname VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    age INT NOT NULL,
    height INT NOT NULL,
    weight INT NOT NULL,
    gender VARCHAR(15) NOT NULL
);


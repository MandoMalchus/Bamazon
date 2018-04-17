DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE DATABASE bamazon_db;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(128)
department_name VARCHAR(120)
price INTEGER(10)
stock_quantity INT NOT NULL
PRIMARY KEY (id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity);
VALUES ("Phone Charger", electronics, 20, 100),("Canon Camera", electronics, 2000, 10),("Iphone X", electronics, 1000, 50),("Xbox One", electronics, 300, 25),("Scarface Portrait", decor, 3000, 2),("Justin Bieber Poster", decor, 0, 1000),("Lava-lamp", decor, 100, 10),("Denim Futon", decor, 1250, 5);

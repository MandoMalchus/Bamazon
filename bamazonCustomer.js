var mysql = require("mysql");
var inquirer = require("inquirer")


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});
connection.connect(function (err) {
    if (err) throw err;
    displayAll();
    // start();
});

function displayAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res)
        console.log("=============================================");
        console.log("List of available products");
        for (let i = 0; i < res.length; i++) {

            // Log all results of the SELECT statement

            console.log("Item ID:" + res[i].id);
            console.log("Item Name:" + res[i].product_name);
            console.log("Item Price:" + res[i].price);
            console.log("=============================================");
        }
        start();
    });
}

function start() {
    inquirer
        .prompt([{
            name: "IdRetrieval",
            type: "input",
            message: "What id are you looking for?",
        },
        {
            name: "UnitAmount",
            type: "input",
            message: "how many units of the product they would like to buy?"
        }])
        .then(function (answers) {
            // console.log(answers)
            connection.query("SELECT * FROM products WHERE id = ?", [answers.IdRetrieval], function (err, res) {
                if (err) throw err;

                // console.log(res[0].stock_quantity)
                if (answers.UnitAmount > res[0].stock_quantity) {
                    console.log("not enough")
                }
                else {
                    for (let i = 0; i < res.length; i++) {

                        var totalPrice = res[i].price * answers.UnitAmount
                        console.log("price: " + res[i].price + "$")
                        console.log("==========================")
                    }
                    var currentStock = res[0].stock_quantity - answers.UnitAmount;
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: currentStock
                            },
                            {
                                id: answers.IdRetrieval
                            }
                        ], function (err, res) {
                            console.log("You have purchased: " + answers.UnitAmount + " Products")
                            console.log("Total Price: " + totalPrice + " $")
                            console.log("Inventory left: " + currentStock)
                        }
                    )
                }
            })
            // var product = res[answers.id - 1];

            // var stock = product.stock_quantity;

            // var currentStock = stock - answers.UnitAmount;

            // if (stock > answers.stock_quantity) {
            //     connection.query(
            //         "UPDATE product SET ? WHERE ?",
            //         [
            //             {
            //                 stock_quantity: currentStock
            //             },
            //             {
            //                 id: answers.IdRetrieval
            //             }
            //         ],
            //         function (error) {
            //             if (error) throw err;
            //             console.log("\nTotal purchase price:" + (answers.UnitAmounts * price));
            //         })
            // }
            connection.end();


        })
}



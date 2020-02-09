require('dotenv').config();
const mysql = require("mysql2");
const schemaDB = 'library';
let sql = "CREATE TABLE book_store (" +
    "bookID int NOT NULL AUTO_INCREMENT,"+
    "ISBN varchar(255) UNIQUE,"+
    "LastName varchar(255),"+
    "FirstName varchar(255),"+
    "BookName varchar(255),"+
    "publishedDate YEAR,"+
    "PRIMARY KEY (bookID)"+
    ")";

//keys / ключи
const connection =  mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

//checking for creating database and table / проверка создания базы и таблица
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL base successful / Подключение к серверу MySQL успешно установлено");
    connection.query("CREATE SCHEMA "+ schemaDB, function (err, result) {
        if (err) {
            console.log('Base already exists / База уже существует : '+ err.message )
        } else {
            console.log("Database created / База данных создана");

            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created");
            });
        }
    });

    connection.changeUser({database: schemaDB})
});

//Query method to database / Запросы к базе и таблице
const queryMethod = function (stringSelector, dataBQ) {
    connection.query(
        `${stringSelector}`,
        function (err, results) {
        if (err) {
            // return console.error('Error connection / Ошибка подключения: ' + err.message);
            console.error('Error connection / Ошибка подключения: ' + err.message);
            return dataBQ(err, results);
        }
        console.log("Query connected to MySQL base successful / Запрос к серверу MySQL успешно установлен");
        dataBQ(err, results); // данные
    });
};


module.exports.queryMethod = queryMethod;
module.exports.schemaDB = schemaDB;
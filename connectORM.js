require('dotenv').config();
const schemaDB = 'library';
let Sequelize  = require('sequelize');


const sequelize = new Sequelize(`library`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
    dialect: 'mysql',
    host: `${process.env.DB_HOST}`,
    port: "3306",
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

const BookStore = sequelize.define("book_store",{
    bookID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    ISBN: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    LastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    FirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    publishedDate: {
        type: Sequelize.STRING,
        allowNull: false
    },

});

sequelize.sync();

module.exports.BookStore = BookStore;
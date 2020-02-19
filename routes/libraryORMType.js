const express = require('express');
const router = express.Router();
const db = require('../connectORM');


// Getting all / Получить все записи
router.get('/books/getAll', async (req, res) => {
    await db.BookStore.findAll({raw:true}).then(result => {
        console.log(JSON.stringify(result));
        try {
            res.json(result)
        } catch (err){
            res.status(500).json({ message: err.message });
        }
    }).catch(err => console.log(err));
});


// Getting one / Получить одну запись по номеру isbn
router.post('/books/isbn/:isbn', async(req, res) => {
    await db.BookStore.findAll({raw:true}).then(result => {
        try {
            if(result.length === 0) {
                return res.status(404).json({ message: "Cannot find the book" });
            } else {
                res.json(result)
            }
        } catch (err){
            res.status(500).json({ message: err.message });
        }
    }).catch(err => console.log(err));
});

// Adding book / Создать запись
router.post('/books/add', async(req, res) => {
    await db.BookStore.findAll({raw:true}).then(result => {
        try {

        } catch (err){
            res.status(500).json({ message: err.message });
        }
    }).catch(err => console.log(err));
});

// Update one / Изменить запись по id
router.put('/books/update/:id', async (req, res) => {
    await db.BookStore.findAll({raw:true}).then(result => {
        console.log(JSON.stringify(result));
        try {
            res.json(result)
        } catch (err){
            res.status(500).json({ message: err.message });
        }
    }).catch(err => console.log(err));
});

// Deleting on / Удалить запись
router.delete('/books/delete/:id', async (req, res) => {
    await db.BookStore.findAll({raw:true}).then(result => {
        console.log(JSON.stringify(result));
        try {
            res.json(result)
        } catch (err){
            res.status(500).json({ message: err.message });
        }
    }).catch(err => console.log(err));
});


// Checking existing data in base / Проверка наличия информации в базе
// async function getBook (req,res,next) {
//     let tempRow = req.params.id;
//     let tempQuery = 'SELECT * FROM book_store WHERE  bookID  IN ('+ `${tempRow})`;
//     await db.queryMethod(tempQuery, function(error, result){
//         next(result)
//     });
// }

module.exports = router;
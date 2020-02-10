const express = require('express');
const router = express.Router();
const db = require('../conectDB');


// Getting all / Получить все записи
router.get('/books/getAll', async (req, res) => {
    let tempQuery = 'SELECT * FROM book_store';
    await db.queryMethod(tempQuery, function(error, result){
        try {
            if(!error) {
                res.json(result)
            } else {
                throw error;
            }
        } catch (err){
            res.status(500).json({ message: err.message });
        }
    });
});

// Getting one / Получить одну запись по номеру isbn
router.post('/books/isbn/:isbn', async(req, res) => {
    let tempRow = req.params.isbn;
    let tempQuery = 'SELECT * FROM book_store WHERE  ISBN  IN ('+ `'${tempRow}')`;

    await db.queryMethod(tempQuery, function(error, result){
        try {
            if(!error) {
                if(result.length === 0) {
                    return res.status(404).json({ message: "Cannot find the book" });
                } else {
                    res.json(result)
                }
            } else {
                throw error;
            }
        } catch (err){
            res.status(500).json({ message: err.message });
        }
    });
});

// Adding book / Создать запись
router.post('/books/add', async(req, res) => {
    let tempRow = req.body;
    let tempQuery = 'INSERT ' +
        'INTO book_store(ISBN,LastName,FirstName,BookName,publishedDate) ' +
        'VALUES (' + `'${tempRow.isbn}', '${tempRow.lastName}', '${tempRow.firstName}', '${tempRow.bookName}', ${tempRow.publishedDate});`;

    await db.queryMethod(tempQuery, function(error, result){
        // res.status(201).json("Added rows: "+ result.affectedRows);
        try {
            if(!error){
                res.status(201).json("Book added: "+ result.affectedRows);
            } else {
                throw error;
            }

        } catch (err){
            res.status(400).json({ message: err.message });
        }
    } );


});

// Update one / Изменить запись по id
router.put('/books/update/:id', async (req, res) => {
    let tempId = req.params.id;
    let tempRow = req.body;
    let updateISBN = tempRow.isbn ? `, ISBN = '${tempRow.isbn}'` : '';
    let updateLastName = tempRow.lastName ? `, LastName = '${tempRow.lastName}'` : '';
    let updateFirstName = tempRow.firstName ? `, FirstName = '${tempRow.firstName}'` : '';
    let updateBookName = tempRow.bookName ? `, BookName = '${tempRow.bookName}'` : '';
    let updatePublishedDate = tempRow.publishedDate ? `, publishedDate = '${tempRow.publishedDate}'` : '';

    let tempQuery = 'UPDATE book_store SET bookID = ' + `'${tempId}'` + `${updateISBN} ${updateLastName} ${updateFirstName} ${updateBookName} ${updatePublishedDate}`+' WHERE  bookID = ' + `${tempId}`;

    await getBook(req,res,function(result){
        try {
            if(result.length === 0) {
                return res.status(404).json({ message: "Cannot find the book" });
            } else {
                db.queryMethod(tempQuery, function(error, result){
                    try {
                        if(!error) {
                            res.status(201).json("Book info updated : " + result.affectedRows);
                        } else {
                            throw error;
                        }
                    } catch (err){
                        res.status(400).json({ message: err.message });
                    }
                });
            }
        } catch (err){
            return res.status(500).json({ message: err.message });
        }
    });
});

// Deleting on / Удалить запись
router.delete('/books/delete/:id', async (req, res) => {
    let tempRow = req.params.id;
    let tempQuery = 'DELETE FROM book_store WHERE  bookID  IN ('+ `${tempRow})`;

    await getBook(req,res,function(result){
        try {
            if(result.length === 0) {
                return res.status(404).json({ message: "Cannot find the book" });
            } else {
                db.queryMethod(tempQuery, function(error, result){
                    try {
                        if(!error && result.affectedRows > 0) {
                            res.json("Book deleted successful");
                        } else {
                            throw error;
                        }
                    } catch (err){
                        res.status(500).json({ message: err.message });
                    }
                });
            }
        } catch (err){
            return res.status(500).json({ message: err.message });
        }
    });
});


// Checking existing data in base / Проверка наличия информации в базе
async function getBook (req,res,next) {
    let tempRow = req.params.id;
    let tempQuery = 'SELECT * FROM book_store WHERE  bookID  IN ('+ `${tempRow})`;
    await db.queryMethod(tempQuery, function(error, result){
        next(result)
    });
}

module.exports = router;
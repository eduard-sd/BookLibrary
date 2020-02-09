var express = require('express');
var app = express();
app.use(express.json());

const libraryRouter = require('./routes/library')
app.use('/library', libraryRouter);

app.listen(3000, function() {
    console.log('Server Started / Сервер запущен');
});

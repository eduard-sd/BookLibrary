// eslint-disable-next-line no-undef
const express = require('express');
const app = express();
// const libraryRouter = require('./routes/library'); //for pure sql query
const libraryRouter = require('./routes/libraryORMType'); //for Sequelize ORM query

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());
app.use('/library', libraryRouter);




app.listen(3000, function() {
    console.log('Server Started / Сервер запущен');
});

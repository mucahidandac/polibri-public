const app = module.exports = require('express')();
const controller = require('../controllers').authorController;

app.get('/:id', controller.getAuthorById);
app.get('/', controller.getAllAuthors);

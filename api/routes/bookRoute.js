const app = module.exports = require('express')();
const controller = require('../controllers').bookController;

app.get('/genres', controller.getAllBookGenres);
app.get('/themes', controller.getAllBookThemes);
app.get('/genres/:id', controller.getBooksByGenreId);
app.get('/themes/:id', controller.getBooksByThemeId);
app.get('/bestsellers', controller.getBestSellersThisMonth);
app.get('/recommendations', controller.getBookRecommendations);
app.get('/search', controller.searchBooksByCustomFilter);
app.get('/:id', controller.getBookById);
app.get('/', controller.getAllBooks);

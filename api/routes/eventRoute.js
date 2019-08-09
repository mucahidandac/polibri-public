const app = module.exports = require('express')();
const controller = require('../controllers').eventController;

app.get('/monthly', controller.getAllEventsThisMonth);
app.get('/:id', controller.getEventById);
app.get('/', controller.getAllEvents);

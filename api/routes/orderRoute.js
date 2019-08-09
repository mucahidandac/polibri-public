const app = module.exports = require('express')();
const controller = require('../controllers').orderController;
const authMiddleware = require('../controllers').authMiddleware;
const passport = require('../utils/passport'); 

app.get('/reservations', authMiddleware, controller.getReservations);
app.put('/reservations', authMiddleware, controller.putReservationOrder);
app.get('/cart', authMiddleware, controller.getShoppingCart);
app.put('/cart', authMiddleware, controller.putDraftOrder);
app.patch('/quantity', authMiddleware, controller.setOrderQuantity);
app.get('/:id', authMiddleware, controller.getOrderById);
app.delete('/:id', authMiddleware, controller.deleteOrderById);
app.get('/', authMiddleware, controller.getAllOrders);

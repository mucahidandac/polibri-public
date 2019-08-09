var Order = require ('../models').Order;
var Book = require ('../models').Book;
var User = require ('../models').User;

const getAllOrders = async (req, res) => {
  Order.where('user_id',req.user.id)
  .fetchAll({withRelated: ['book','book.authors','book.similarities','book.events','book.genre','book.theme','book.reviews','user']})
  .then(function(orders) {
    if(orders) return res.status(200).json(orders.toJSON());
    else return res.status(400).json({});
  }).catch(function(err) {
    console.error(err);
    return res.status(500).json({});
  }); 
}

const getOrderById = async (req, res) => {
  Order.where('id',req.params.id)
  .fetch({withRelated: ['book','book.authors','book.similarities','book.events','book.genre','book.theme','book.reviews']})
  .then(function(order) {
    if(order){
      res.status(200).json(order.toJSON());
    }else res.status(404).json({});
  })
  .catch(function(err) {
    console.error(err);
    return res.status(500).json({});
  }); 
}
const putDraftOrder = async (req, res) => {
  var params = req.body;
  params.status = 'draft'
  params.user_id = req.user.id;
  if(!params.book_id) return res.status(400).json({});
  new Order().save(params,{method:'insert'}).then(function(order) {
    if(order){ 
      var orderJson = order.toJSON();
      delete orderJson.user_id;
      return res.status(200).json(orderJson);
    } else return res.status(500).json({});
  }).catch(function(err) {
    console.error(err);
    return res.status(500).json({});
  });
}
const putReservationOrder = async (req, res) => {
  var params = req.body;
  params.status = 'reserve'
  params.user_id = req.user.id;
  console.log(params);
  if(!params.book_id) return res.status(400).json({});
  new Order().save(params,{method:'insert'})
  .then(function(order) {
    if(order){
       var orderJson = order.toJSON();
      //  delete orderJson.user_id;
      return res.status(200).json(orderJson);
    } else return res.status(500).json({});
  }).catch(function(err) {
    console.error(err);
    return res.status(500).json({});
  });
}

const deleteOrderById = async (req, res) => {
  Order.where('id',req.params.id).destroy()
  .then(function(order) {
    if(order){ return res.status(200).json({});
    }else return res.status(400).json({});
  })
  .catch(function(err) {
    console.error(err);
    if(err.message == 'No Rows Deleted') res.status(404).json({});
    else return res.status(500).json({});
  }); 
}

const getShoppingCart = async (req, res) => {
  Order.forge()
  .query(function(qb) {
    qb.where('user_id', req.user.id);
    qb.where('status', 'draft');
  })
  .fetchAll({withRelated: ['book','book.authors','book.similarities','book.events','book.genre','book.theme','book.reviews']})
  .then(function(order) {
    if(order){ return res.status(200).json(order.toJSON());
    }else return res.status(404).json({});
  })
  .catch(function(err) {
    console.error(err);
    return res.status(500).json({});
  }); 
}

const getReservations = async (req, res) => {
  Order.forge()
  .query(function(qb) {
    qb.where('user_id', req.user.id);
    qb.where('status', 'reserve');
  })
  .fetchAll({withRelated: ['book','book.authors','book.similarities','book.events','book.genre','book.theme','book.reviews']})
  .then(function(order) {
    if(order){ return res.status(200).json(order.toJSON());
    }else return res.status(404).json({});
  })
  .catch(function(err) {
    console.error(err);
    return res.status(500).json({});
  }); 
}

const setOrderQuantity = async (req, res) => {
  var params = req.body;
  Order.forge()
  .query(function(qb) {
   qb.where('id', params.order_id);
  })
  .fetch({withRelated: ['user']})
  .then(function(order) {
    if(order){ 
      if(order.related('user').id != req.user.id) return res.status(401).json({});
      order.set('quantity', params.quantity);
      order.save();
      return res.status(200).json(order.toJSON());
    }else return res.status(404).json({});
  })
  .catch(function(err) {
    console.error(err);
    return res.status(500).json({});
  }); 
}
module.exports = {
    getAllOrders,
    getOrderById,
    deleteOrderById,
    getShoppingCart,
    getReservations,
    putDraftOrder,
    putReservationOrder,
    setOrderQuantity
}
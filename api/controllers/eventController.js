var Event = require ('../models').Event;

const getAllEvents = async (req, res) => {
  Event.fetchAll({withRelated: ['book','book.authors','book.similarities','book.genre','book.theme','book.reviews','book.reviews.user']})
    .then(function(events) {
      if(events){
        return res.status(200).json(events.toJSON());
      }else return res.status(404).json({});
  }).catch(function(err) {
    console.error(err);
    return res.status(500).json({});
  }); 
}

const getEventById = async (req, res) => {
  Event.where('id',req.params.id)
  .fetch({withRelated: ['book','book.authors','book.similarities','book.genre','book.theme','book.reviews','book.reviews.user']})
  .then(function(event) {
    if(event){
      return res.status(200).json(event.toJSON());
    }else return res.status(404).json({});
  })
  .catch(function(err) {
    console.error(err);
    return res.status(500).json({});
  }); 
}

const getAllEventsThisMonth = async (req, res) => {
  var date = new Date();  
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); 
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); 

  Event.forge().query(function(qb) {
    qb.whereBetween('startdate', [firstDay, lastDay]);
  })
  .fetchAll({withRelated: ['book','book.authors','book.similarities','book.genre','book.theme','book.reviews','book.reviews.user']})
  .then(function(events) {
    if(events){
      res.status(200).json(events.toJSON());
    }else res.status(404).json({});
  })
  .catch(function(err) {
    console.error(err);
    return res.status(500).json({});
  }); 
}

module.exports = {
    getAllEvents,
    getEventById,
    getAllEventsThisMonth
}
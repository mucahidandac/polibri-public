var Author = require ('../models').Author;

const getAllAuthors = async (req, res) => {
    Author.fetchAll({withRelated: ['books','books.events','books.similarities','books.genre','books.theme','books.reviews','books.reviews.user']}).then(function(author) {
    res.status(200).json(author.toJSON());
      }).catch(function(err) {
        console.error(err);
        return res.status(500).json({});
    }); 
}
const getAuthorById = async (req, res) => {
  Author.where('id',req.params.id).fetch({withRelated: ['books','books.events','books.similarities','books.genre','books.theme','books.reviews','books.reviews.user']})
  .then(function(author) {
    if(author){
      res.status(200).json(author.toJSON());
    }else res.status(404).json({});
  })
  .catch(function(err) {
      console.error(err);
      return res.status(500).json({});
  }); 
}
module.exports = {
    getAllAuthors,
    getAuthorById
}
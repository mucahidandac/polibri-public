var Book = require ('../models').Book;
var Genre = require ('../models').Genre;
var Theme = require ('../models').Theme;

const getAllBooks = async (req, res) => {
  Book.fetchAll({withRelated: ['authors','similarities','events','genre','theme','reviews','reviews.user']})
  .then(function(books) {
      if(books){
        return res.status(200).json(books.toJSON());
      }else return res.status(404).json({});

  }).catch(function(err) {
      console.error(err);
      return res.status(500).json({});
  }); 
}

const getBookById = async (req, res) => {
  Book.where('id',req.params.id)
  .fetch({withRelated: ['authors','similarities','events','genre','theme','reviews','reviews.user']})
  .then(function(book) {
    if(book){
      return res.status(200).json(book.toJSON());
    }else return res.status(404).json({});
  })
  .catch(function(err) {
      console.error(err);
      return res.status(500).json({});
  }); 
}

const getAllBookGenres = async (req, res) => {
  Genre.fetchAll()
  .then(function(genres) {
    if(genres){
      return res.status(200).json(genres.toJSON());
    }else return res.status(404).json({});
  })
  .catch(function(err) {
      console.error(err);
      return res.status(500).json({});
  }); 
}

const getAllBookThemes = async (req, res) => {
  Theme.fetchAll()
  .then(function(themes) {
    if(themes){
      return res.status(200).json(themes.toJSON());
    }else return res.status(404).json({});
  })
  .catch(function(err) {
      console.error(err);        
      return res.status(500).json({});
  }); 
}


const getBooksByGenreId = async (req, res) => {
  Book.where('genre_id',req.params.id)
  .fetchAll({withRelated: ['authors','similarities','events','genre','theme','reviews','reviews.user']})
  .then(function(books) {
    if(books){
      res.status(200).json(books.toJSON());
    }else res.status(404).json({});
  })
  .catch(function(err) {
      console.error(err);
      return res.status(500).json({});
  }); 
}

const getBooksByThemeId = async (req, res) => {
  Book.where('theme_id',req.params.id)
  .fetchAll({withRelated: ['authors','similarities','events','genre','theme','reviews','reviews.user']})
  .then(function(books) {
    if(books){
      res.status(200).json(books.toJSON());
    }else res.status(404).json({});
  })
  .catch(function(err) {
      console.error(err);
      return res.status(500).json({});
  }); 
}

const getBestSellersThisMonth = async (req, res) => {
  Book.where('id','in', [1, 3])
  .fetchAll({withRelated: ['authors','similarities','events','genre','theme','reviews','reviews.user']})
  .then(function(books) {
    if(books){
      res.status(200).json(books.toJSON());
    }else res.status(404).json({});
  })
  .catch(function(err) {
      console.error(err);
      return res.status(500).json({});
  }); 
}

const getBookRecommendations = async (req, res) => {
  Book.where('id','in', [2, 4, 5])
  .fetchAll({withRelated: ['authors','similarities','events','genre','theme','reviews','reviews.user']})
  .then(function(books) {
    if(books){
      res.status(200).json(books.toJSON());
    }else res.status(404).json({});
  })
  .catch(function(err) {
      console.error(err);
      return res.status(500).json({});
  }); 
}

const searchBooksByCustomFilter = async (req, res) => {
  var param_genre_ids = req.query.genre_ids;
  var param_theme_ids = req.query.theme_ids;

  var genre_ids = param_genre_ids != null && param_genre_ids != '' ? param_genre_ids.split(',') : null;
  var theme_ids = req.query.theme_ids != null && param_theme_ids != '' ? param_theme_ids.split(','): null;

  Book.forge()
  .query(function(qb) {
    if(genre_ids != null && genre_ids.length  > 0 ) qb.whereIn('genre_id', genre_ids);
    if(theme_ids != null && theme_ids.length  > 0) qb.whereIn('theme_id', theme_ids);
  })
  .fetchAll({withRelated: ['authors','similarities','events','genre','theme','reviews','reviews.user']})
  .then(function(books) {
    if(books){
      res.status(200).json(books.toJSON());
    }else res.status(404).json({});
  })
  .catch(function(err) {
      console.error(err);
      return res.status(500).json({});
  }); 
}

module.exports = {
    getAllBooks,
    getBookById,
    getAllBookGenres,
    getAllBookThemes,
    getBooksByGenreId,
    getBooksByThemeId,
    getBestSellersThisMonth,
    getBookRecommendations,
    searchBooksByCustomFilter

}
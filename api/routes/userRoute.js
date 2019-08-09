const app = module.exports = require('express')();
const controller = require('../controllers').userController;
const authMiddleware = require('../controllers').authMiddleware;
const passport = require('../utils/passport'); // pass passport for configuration


app.post('/register', controller.postRegister);

app.post('/login', passport.authenticate('local'),
  function(req, res) {
    var userJson = req.user.toJSON();
    delete userJson.password;
    userJson.cookie = req.headers.cookie.substring(12); //connect.sid=
    res.status(200).json(userJson);
});
// Endpoint to logout
app.get('/logout', function(req, res){
    req.logout();
    res.sendStatus(200);
});
app.get('/is-cookie-alive', authMiddleware, function(req,res){
   var userJson = req.user;
   delete userJson.password;
  res.status(200).json(userJson);
});

app.get('/:id', authMiddleware, controller.getUserById);

app.use('*',function(req, res, next){
  res.status(404);

  res.format({
    html: function () {
      res.sendFile(path.join(__dirname+'/public/pages/404.html'));
    },
    json: function () {
      res.json({ error: 'Not found' })
    },
    default: function () {
      res.type('txt').send('Not found')
    }
  })
});

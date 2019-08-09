const port = process.env.PORT || 5000;
const express = require('express');
const path = require ("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('yamljs').load('./spec.yaml');
const markdown = require("markdown-js");
const fs = require("fs");

const app = express();
const routes = require('./api/routes');

const passport = require('./api/utils/passport'); 
const uuid = require('uuid').v4;
const session = require('express-session')
const FileStore = require('connect-loki')(session);

//Session & Auth Settings
app.use(session({
    genid: (req) => {
      return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'asfdgsfdv^24&as76dc(3492034kl.ç32zx',
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
//Parsers
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//D2: the OpenAPI specification of your Backend (in the form of a YAML file) available at ADDR/backend/spec.yaml
app.use('/backend/spec.yaml',express.static(path.join(__dirname,'spec.yaml')));
//D3: a SwaggerUI page available online at ADDR/backend/swaggerui.  
app.use('/backend/swaggerui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//D1: a main documentation page available online at url ADDR/backend/main.html.
app.get('/backend/main.html', function(req, res){
    var str = fs.readFileSync("./api/README.md", "utf8");
    var html = markdown.makeHtml(str);
    res.send(html);
});


app.use('/api/books', routes.bookRoutes);
app.use('/api/authors', routes.authorRoutes);
app.use('/api/events', routes.eventRoutes);
app.use('/api/users', routes.userRoutes);
app.use('/api/orders', routes.orderRoutes);
app.use('/', express.static(path.join(__dirname, 'public')));

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

// app.use(function(err, req, res, next){
//   res.status(err.status || 500);
//   res.render('500', { error: err });
// });

app.listen(port);
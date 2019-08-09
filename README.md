# Polibri

E-commerce web application using [Express 4](http://expressjs.com/).

## Dependencies
- Npm version 6.4.1
- Node.js version 10.15.3
- Knex version 0.17.6
- Nodemon version 1.19.1
- posgresql version 7.11.0

## Installation

```shell
git clone https://github.com/AndacMucahid/polibri-public/
cd polibri
npm install
```

## Running Locally

In order to run the application,

- first install a local posgresql database then insert credentials to [knexfile.js](./knexfile.js), then:  

```shell
npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Documentation

- [OpenApi 3.0 documentation](https://polibri.herokuapp.com/backend/swaggerui)

### Tools used

- Core libraries
    - [bookshelf](https://github.com/bookshelf/bookshelf) for object relational mapping. It's a library working with [knex](https://github.com/tgriesser/knex) which is for database connections
    - [express.js](https://github.com/expressjs/express) for simplify application server structure while keeping node.js style backend intact.
    - [passport](https://github.com/jaredhanson/passport) and [passport-local](https://github.com/jaredhanson/passport-local) for easy to implement authentication middleware and login functionality via cookies.
    - [express-session](https://github.com/expressjs/session) to handle session management with [connect-loki](https://github.com/Requarks/connect-loki) which is local cookie storing tool.
    
- Helper libraries
    - [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) to serve OpenAPI documentation as UI.
    - [morgan](https://github.com/expressjs/morgan) Http request logger, a helper tool.
    - [bcyrpt](https://github.com/dcodeIO/bcrypt.js) for storing hashed passwords
    - [nodemon](https://github.com/remy/nodemon) to restart application server whenever a file is changed. Helped too much while developing.
    - [yamljs](https://github.com/jeremyfa/yaml.js/) for parsing our OpenApi document. SwaggerUI-express was not supporting .yaml directly.


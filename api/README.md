# Documentation of the Backend part
    > Deliverable D1
## General group information

| Member | Role | First name | Last Name | Matricola | Email address |
| :---: | :---: | :--- | :--- | :--- | :--- |
| 1 | Backend developer / Administrator | Mucahid | Andac | 894650 |mucahid.andac@mail.polimi.it |
| 2 | Frontend developer | Ahmet | Cagan | 895749 |ahmet.cagan@mail.polimi.it |
| 3 | UX-UI designer / Frontend developer | Martina | Ioviono | 903709| martina.iovino@mail.polimi.it |
    
## Links to other deliverables

- Deliverable D0: the web application is accessible at [this address](https://polibri.herokuapp.com).
- Deliverable D2: the YAML or JSON file containing the specification of the app API can be found at [this address](https://polibri.herokuapp.com/backend/spec.yaml).
- Deliverable D3: the SwaggerUI page of the same API is available at [this address](https://polibri.herokuapp.com/backend/swaggerui).
- Deliverable D5: the address of the online source control repository is available [this address](https://github.com/AndacMucahid/polibri-public). We hereby declare that this is a private repository and, upon request, we will give access to the instructors.

## Specification
### Web Architecture
_Describe here, with a diagram, the components of your web application and how they interact. Highlight which parts belong to the application layer, data layer or presentation layer. How did you ensure that HTML is not rendered server side?_

![System Architecture](https://polibri.herokuapp.com/assets/img/SystemArchitecture.jpg)

- Presentation Layer
    - Public files
        - html, css, js files are here shown to user statically via Express.js without rendering server-side 
- Application Layer
    - Routes
        - Router objects for endpoints starting with /api. handles Http requests and redirects it to related controllers.
    - Controllers
        - Controller functions to get the requested data from the models, create response with JSON structure.
    - Models
        - Data access objects with object relationships included. 
    - Utils
        - Some application-wide used tools 
- Data Layer
    - Database
        - Posgresql database in heroku addons used to store data.

### API
#### REST compliance
_Describe here to what extent did you follow REST principles and what are the reasons for which you might have decided to diverge. Note, you must not describe the whole API here, just the design decisions._

- ***Client-server:*** We seperated frontend side with backend side with prefix ***/api***. All the urls under ***/api*** served according to this principles.
- ***Stateless:*** We managed all requests as new request. Hence this principle is followed.
- ***Cachable:*** We didnt follow this principle since it wasn't mandatory and during development caching was thought unnecessary.
- ***Uniform interface:*** We refactored whole controllers to have a same request processing pattern. Therefore this principle is followed.
- ***Layered system:*** Since we divided application properly into 3 layers (data, application, presentation), apis only processed. and returned required data. Hence we followed this principle. 
- ***Code on demand:*** We didn't return any executables hence not followed this optional principle.

#### OpenAPI Resource models
_Describe here synthetically, which models you have introduced for resources._

- **User:**  contains informations for exchanging data during authentication 
- **Book:** Contains Book entity attributes with entity relations included for representing incoming data (like *similar books*)
- **Author:** Contains Author entity attributes with entity relations included for representing incoming data (like *books of author*)
- **Event:** Contains Event entity attributes with entity relations included for representing incoming data (like *book of event*)
- **Order:** reservations and adding book to cart actions encapsulated in this entity. **status=reserve** represents reservation, **status=draft** represents a book in shopping cart
- **Review:** helper entity to encapsulate reviews of a book shown with related entities (like *which book this review belongs to*)
- **Genre:** Contains Genre entity attributes
- **Theme:** Contains Theme entity attributes

### Data model
_Describe with an ER diagram the model used in the data layer of your web application. How these map to the OpenAPI data model?_

![ER-Diagram](https://polibri.herokuapp.com/assets/img/e-r_diagram.jpg)

OpenApi implementation of ER-diagram is identical in terms of naming and referencing. Relationship names in ER-diagram weren't mapped as data model to OpenApi since it's a process done behind the scene.
## Implementation
### Tools used
_Describe here which tools, languages and frameworks did you use for the backend of the application._

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
    - [markdown-js](https://github.com/evilstreak/markdown-js). We wanted to keep our D1 document in Markdown style which is located at ***api/README.md***. This library automatically converts it to html for D1 delivery.

### Discussion
_- How did you make sure your web application adheres to the provided OpenAPI specification?_

- We synced and tested all apis at the end of backend implementation. Therefore REST apis are identical with OpenApi

_- Why do you think your web application adheres to common practices to partition the web application (static assets vs. application data)?_

- Firstly, we followed [component-based structuring](https://github.com/i0natan/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md) but we spent too much time to organize it. Then we returned into role-based structuring which is current version. In terms of job splitting, yes we divided code to related places (like routings are only in route files -excluding some exceptions-). 

_- Describe synthetically why and how did you manage session state, what are the state change triggering actions (e.g., POST to login etc..)._

- We used [passport-local](https://github.com/jaredhanson/passport-local) to manage authentication process. First we initialized the library instance, then created a authentication middleware for login-required apis. Starting point is ***/api/users/login*** endpoint. If it's successful, server returns a http only cookie. Later requests to authentication middleware included endpoints checks existence of this cookie.
***/api/users/logout*** endpoint deletes if cookie existing and closing session. 

_- Which technology did you use (relational or a no-SQL database) for managing the data model?_

- PosgreSql database is selected as relational database solution

## Other information
### Task assignment
_Describe here how development tasks have been subdivided among members of the group:_

- Ahmet worked on Front-end (60%), on Back-end (10%) and Usability Report (30% of his time)
- Martina worked on Front-end (70%) and Design Document (30% of the her time)
- Mucahid worked on Back-end (70%), on OpenApi3 specs (10%) and Front-end (20% of the his time)

### Analysis of existing API
_Describe here if you have found relevant APIs that have inspired the OpenAPI specification and why (at least two)._
- ***Google Cloud Apis:*** We inspected how well they structured apis and learnt the importance of readability in Api docs 
- ***Facebook Login Api:*** We checked their apis to understand how login flows created and managed.

### Learning outcome
_What was the most important thing all the members have learned while developing this part of the project, what questions remained unanswered, how you will use what you've learned in your everyday life?_
   
- Martina has improved her experience in HTML, CSS and JavaScript programming, she would like to learn more about the backend development.
- Ahmet has learnt how to handle javascript api requests and responses. He improved his html and css experiences. He realized how important openApi documentition to understand apis working principles. He would like to improve himself more in CSS to create better layouts for web applications.
- Mucahid has improved his full-stack skills and understood importance of code cleaning and documentation. He would like to improve his frontend skills to develop responsive web pages faster.   
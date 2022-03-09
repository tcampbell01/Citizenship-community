const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const helpers = require('./utils/helpers');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Mystery user',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// turn on routes
app.use(routes);

// socket io code
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

// set on handlebars as template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => console.log('Now listening'));
});


// Old server.js setup, for reference in case we need to go back
// const path = require('path');
// const express = require('express');
// const routes = require('./controllers');
// const sequelize = require('./config/connection');
// const session = require('express-session');
// const helpers = require('./utils/helpers');

// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const sess = {
//   secret: 'Mystery user',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session(sess));

// // turn on routes
// app.use(routes);

// // set on handlebars as template engine
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({ helpers });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// // turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });
     
     
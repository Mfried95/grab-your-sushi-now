// load .env data into process.env
require('dotenv').config();
require('body-parser');
// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const bodyParser = require('body-parser');


const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);

app.use(cookieSession({
  name: 'session',
  keys: ["key1"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.static('public'));

app.use(bodyParser.json());
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const homepageRoutes = require('./routes/homepage');
const loginRoutes = require('./routes/loginRoute');
const logoutRoutes = require('./routes/logoutRoute');
const registerRoutes = require('./routes/registerRoute');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orderRoute');
const restaurantRoutes = require('./routes/restaurantRoute');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/homepage', homepageRoutes);
app.use('/menu', menuRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/register', registerRoutes);
app.use('/order', orderRoutes);
app.use('/restaurant', restaurantRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  let templateVars = {
    user: req.session.user
  };
  res.render("homepage", templateVars);
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

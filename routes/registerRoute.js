/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const database = require("../db/queries/dbQueries");

router.get('/', (req, res) => {
  res.render('register', { user: req.user }); // Pass the user object here
});

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  database
    .register(name, email, password)
    .then(user => {
      req.user = user; // Set the req.user object
      res.cookie('name', user.name);
      console.log(res);
      res.redirect('/menu');
    })
    .catch(err => console.log(err));
});

module.exports = router;

/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const database = require("../db/queries/dbQueries");

//login page-setup
router.get('/', (req, res) => {
  console.log("Login Page");
  if (req.session.user_id) {
    console.log(req.session.user_id);
    res.redirect("/");
  } else {
    let templateVars = {
      user_id: null
    };
    res.render('login', templateVars);
  }
});

router.post("/", (req, res) => {
  database
    .login(req.body.email, req.body.password)
    .then(user => {
      if (!user) {
        res.send("User account doesn't exist. Please register first. Thank you. :)");
        return;
      }
      req.session.user_id = user.id;
      res.redirect("/");
    })
    .catch(err => res.send(err));
});

module.exports = router;

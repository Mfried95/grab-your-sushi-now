/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const database = require("../db/queries/dbQueries");
const cookieSession = require("cookie-session");

router.use(
  cookieSession({
    name: "session",
    keys: ["key1"]
  })
);

router.get('/', (req, res) => {
  if (req.session.user_id) {
   return res.redirect('/');
  }
  let templateVars = {
    user_id: req.session.user_id,
    user_email: req.session.email,
    user_name: req.session.user_name,
    user_isowner: null
  };
  res.render("register", templateVars);
});

router.post('/', (req, res) => {
  const { name, email, password, phone, address, 'credit-card': creditCard } = req.body;
  console.log("+++++++++++++++", req.body)
  const hash = bcrypt.hashSync(password, 12);
  const values = [name, email, hash, phone, address, creditCard];

  database
    .addUser(values)
    .then(user => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.user_id = user.id;
      req.session.user_name = user.name;
      req.session.email = user.email;
      req.session.phone = user.phone;
      req.session.address = user.address;
      req.session.creditCard = user.creditCard;
      res.redirect("/menu");
    })
    .catch(e => {
      console.log("+++++++++++++++", e)
      res.send(e)
    });
});

module.exports = router;

/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const menuQueries = require("../db/queries/dbQueries");

//menu page-setup
router.get("/", (req, res) => {
  menuQueries
    .getMenuItems()
    .then((items) => {
      const templateVars = {
        user: req.session.user, //change the variable name
        items,
      };
      res.render("menu", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//menu page-post
router.post("/", (req, res) => {
  menuQueries
    .addItemstoCart()
    .then(items);
  res.send((items) => {

  });
});


module.exports = router;

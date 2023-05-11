/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const showOrdersToRestaurant = require("../db/queries/dbQueries");


router.get("/", (req, res) => {
  showOrdersToRestaurant
    .showOrdersToRestaurant()
    .then((data) => {
      res.render("restaurant", { data: JSON.stringify(data.rows) });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
  



module.exports = router;

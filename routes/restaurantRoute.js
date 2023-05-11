/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const dbQueries = require("../db/queries/dbQueries");
const db = require("../db/connection");


router.get("/", (req, res) => {
  res.render("restaurant",);
});
  



module.exports = router;

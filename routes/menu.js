/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
<<<<<<< HEAD
=======
const db = require("../db/connection");
const cookieSession = require("cookie-session");
>>>>>>> 498d9a6f471e6c7f2943aa8b0f4c31be650a4c70
const router = express.Router();
const menuQueries = require("../db/queries/dbQueries");

router.get("/", (req, res) => {
  menuQueries
    .getMenuItems()
    .then((items) => {
      const templateVars = {
        user: cookieSession.name,
        items,
      };
      res.render("menu", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

<<<<<<< HEAD
=======

router.post("/", (req, res) => {
  const orderMenu = req.body.items;
  menuQueries
    .addItemsToCart(orderMenu)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


>>>>>>> 498d9a6f471e6c7f2943aa8b0f4c31be650a4c70
module.exports = router;

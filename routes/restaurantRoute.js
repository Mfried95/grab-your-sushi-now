/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const { showOrdersToRestaurant, updateOrderStatus, updateOrderComplete } = require("../db/queries/dbQueries");
const sendSms = require("../helpers");


router.get("/", (req, res) => {
  showOrdersToRestaurant()
    .then((data) => {
      res.render("restaurant", { data });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/confirm", (req, res) => {
  updateOrderStatus(req.body.order_id, 'confirmed')
    .then((data) => {
      let message = '';
      sendSms('+16476095630', 'Your order is in progress!');
      res.send({data, message});
    });
});

router.post("/complete", (req, res) => {
  updateOrderComplete(req.body.order_id, 'completed')
    .then((data) => {
      let message = '';
      sendSms('+16476095630', 'Your order is complete for pickup!');
      res.send({data, message});
    });
});

module.exports = router;

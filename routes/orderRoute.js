/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUserInfo, getOrderDetails } = require("../db/queries/dbQueries");

router.get('/', async (req, res) => {
  try {
    // Fetch user information
    const userInfo = await getUserInfo();

    // Fetch order details for the first order
    const orderDetails = await getOrderDetails(1);

    // Render the order page and pass the user information and order details
    res.render('order', { userInfo, orderDetails });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;

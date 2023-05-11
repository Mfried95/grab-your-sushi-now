/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getUserInfo, getOrderDetails, addItemsToCart, addItemsToOrders, getUserOrderHistory } = require("../db/queries/dbQueries");

router.get('/', async (req, res) => {
  console.log('orderRoute');
  try {
    // Fetch user information
    const userInfo = await getUserInfo();

    // Fetch order details for the first order
    const orderDetails = await getOrderDetails(1);

    // Fetch order history
    const orderHistory = await getUserOrderHistory();

    console.log('user history', orderHistory);

    // Render the order page and pass the user information and order details
    res.render('order', { userInfo, orderDetails, orderHistory });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


router.post('/', (req, res) => {
  console.log('order route');
  console.log(req.body);
  //extracting variables from body
  let orderCart = req.body.orderCart;
  let totalCost = req.body.totalCost;

  //function call to insert into orders table
  addItemsToOrders([totalCost])
    .then(res => {
      let order_id = res[0].id;
      for (let itemId in orderCart) {
        let item = orderCart[itemId];
        addItemsToCart(item.id, item.quantity, item.cost, order_id);
      }
    });

  res.status(200).json('success');
});



module.exports = router;

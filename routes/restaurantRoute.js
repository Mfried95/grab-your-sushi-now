/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dbQueries = require('../db/queries/dbQueries');
const db = require('../db/connection');
const twilio = require('twilio');

router.get('/', (req, res) => {
  dbQueries.getUserWithEmail(req.body.email)
    .then(user => {
      return templateVars = {
        user_id: req.session.user_id,
        user_name: req.session.user_name,
        user_email: req.session.user_email,
      };
    })
    .then(templateVars => {
      dbQueries.getMenuItems(templateVars.user_id)
      .then(menuItems => {
        let templateVars = {
          menuItems: menuItems,
          user_id: req.session.user_id,
          user_name: req.session.user_name,
          user_email: req.session.user_email,
        };
        res.render('restaurant', templateVars);
      });
    });
});

router.post('/', (req, res) => {
  const accountSid = "";
  const authToken = "";
  const client = new twilio(accountSid, authToken);
  if (req.body.order) {
    client.messages
      .create({
        body: `Your order is complete!`,
        from: '+1',
        to: '+1'
      })
      .then(message => console.log(message.sid));
      dbQueries.updateOrderStatus(req.body.order)
    } else {
      client.messages
      .create({
        body: `Your order has been accepted!`,
        from: '+1',
        to: '+1'
      })
      .then(message => console.log(message.sid));
      dbQueries.updateOrderStatus(req.body.order)
  }
  res.redirect('restaurant');
});


module.exports = router;

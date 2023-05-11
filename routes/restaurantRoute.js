/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

require('dotenv').config();
const express = require('express');
const router = express.Router();
const dbQueries = require('../db/queries/dbQueries');
const db = require('../db/connection');

// const sendSms = require('./twilio');
const accountSid = 'ACa5bb62a133fb76403ae9591938b950b6';
const authToken = '9de7766ff5cb52fae0c3744c3cf4b71b';
const sendSms = (phone, message) => {
  console.log('sendSms');
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
       body: message,
       from: +12705174026,
       to: phone
     })
    .then(message => console.log(message.sid));
}

router.get('/', (req, res) => {

  // const welcomeMessage = 'Just testing';

  // sendSms( +16476095630, welcomeMessage);
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
    console.log('order complete');
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

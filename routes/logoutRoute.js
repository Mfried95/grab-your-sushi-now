/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//logout page-setup
router.get('/', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;

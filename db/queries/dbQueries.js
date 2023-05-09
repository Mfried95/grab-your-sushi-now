const db = require('../connection');

const getMenuItems = function() {
  return db.query('SELECT * from menu_items;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

module.exports = { getMenuItems };

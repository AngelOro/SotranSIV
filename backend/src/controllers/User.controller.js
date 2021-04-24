const controller = {};
const connection = require('../../dbConnection/connection')
const conn = connection()
const Users = require('../model/Users');

controller.getUsers = (req, res, next) => {
    conn.query(
      "SELECT * FROM tbl_usuarios",
      (err, rows) => {
        if (err) next(new Error(err));
        else res.json({ success: true, data: rows });
      }
    );
  };


  module.exports = controller;
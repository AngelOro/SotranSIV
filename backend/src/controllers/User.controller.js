const connection = require('../../dbConnection/connection')
const conn = connection()
const users = require('../model/Users');
const controller = {};

controller.getUser = (req, res, next) => {
  const {usuario, clave} = req.params;
    conn.query( 
      "SELECT id_rol FROM tbl_usuarios where usuario = '" + req.params.usuario +"' and clave = '" + req.params.clave + "'", (err, rows) => {
        if(err) next(new Error(err));
        else res.json({ success: true, data: rows });
      })
  }


  module.exports = controller;
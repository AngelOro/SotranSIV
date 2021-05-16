const connection = require('../../dbConnection/connection')
const conn = connection()
const users = require('../model/Users');
const controller = {};

controller.getUser = (req, res, next) => {
  conn.query( 
    "select u.id_rol, r.descripcion  from tbl_usuarios u inner join tbl_roles r on u.id_rol = r.id_rol where u.usuario ='" + req.params.usuario +"' and clave = '" + req.params.clave + "'", (err, rows) => {
      if(err) next(new Error(err));
      else res.json({ success: true, data: rows});
    })
}


  module.exports = controller;
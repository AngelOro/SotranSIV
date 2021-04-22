const Sequelize = require('sequelize');
var roles = require("./Role")
var sequelize = require('./database');


var nameTable = 'tbl_usuarios';


var users = sequelize.define(nameTable, {

    id_usuarios:{
        type:Sequelize.STRING,
        primaryKey: true
    },
    usuario:Sequelize.STRING,
    clave:Sequelize.STRING, 
    id_rol: {
        type: Sequelize.INTEGER,
        reference: {
          model: roles,
          key: "id_rol",
        },
      }
}, {
    timestamps: false,
});

module.exports = users;

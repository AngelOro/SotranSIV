const Sequelize = require('sequelize');
var sequelize = require('./database');

var nameTable = 'tbl_roles';

var roles = sequelize.define(nameTable, {

    id_rol:{
        type:Sequelize.STRING,
        primaryKey: true
    },
    descripcion:Sequelize.STRING,

}, {
    timestamps: false,
});

module.exports = roles;

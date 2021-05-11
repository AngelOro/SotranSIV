const Sequelize = require('sequelize');
var sequelize = require('./database');

var nameTable = 'tbl_estado_ruta';

var StateRoute = sequelize.define(nameTable, {

    id_estado_ruta:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    descripcion:Sequelize.STRING
    
}, {
    timestamps: false,
});

module.exports = StateRoute;
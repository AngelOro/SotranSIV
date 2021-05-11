const Sequelize = require("sequelize");
var sequelize = require("./database");

var nameTable = "tbl_estado_vehiculo";

var stateVehicle = sequelize.define(nameTable, {
    id_estado_vehiculo:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    descripcion:Sequelize.STRING,

}, {
    timestamps: false,
});

module.exports = stateVehicle;
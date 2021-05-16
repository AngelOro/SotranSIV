const Sequelize = require("sequelize");
var sequelize = require("./database");

var nameTable = "tbl_estado_conductor";

var stateConduct = sequelize.define(nameTable, {
    id_estado_conductor:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    descripcion:Sequelize.STRING,

}, {
    timestamps: false,
});

module.exports = stateConduct;
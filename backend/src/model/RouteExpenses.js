const Sequelize = require("sequelize");
var sequelize = require("./database");
var Vehiculos = require("./Vehicle");

var nameTable = "tbl_gastos_viaje";

var RouteExpenses = sequelize.define(
  nameTable,
  {
    id_gasto: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    vehiculo: {
        type: Sequelize.INTEGER,
        reference: {
          model: Vehiculos,
          key: "id_vehiculo",
        },
      },
    fecha_realizado: Sequelize.DATE,
    valor_mantenimiento: Sequelize.DOUBLE,
    descripcion: Sequelize.STRING,
    codigo_factura: Sequelize.STRING,
    nombre_empresa: Sequelize.STRING
  },
  {
    timestamps: false,
  }
);

module.exports = RouteExpenses;
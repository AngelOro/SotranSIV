const Sequelize = require("sequelize");
var sequelize = require("./database");
var Marcas = require("./Marcas");
var TipoVehiculo = require("./TipoVehiculo");
var stateVehicle = require("./StateVehicle");

var nameTable = "tbl_vehiculos";

var Vehicle = sequelize.define(
  nameTable,
  {
    id_vehiculo: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    placa: Sequelize.STRING,
    matricula: Sequelize.STRING,
    r_trailer: Sequelize.STRING,
    capacidad: Sequelize.STRING,
    fecha_soat: Sequelize.DATE,
    fecha_poliza: Sequelize.DATE,
    modelo: Sequelize.STRING,
    fecha_tecnomecanica: Sequelize.DATE,
    id_marca: {
      type: Sequelize.INTEGER,
      // This is a reference to another model
      references: {
        model: Marcas,
        key: "id_marca",
      },
    },
    id_tipo: {
      type: Sequelize.INTEGER,
      reference: {
        model: TipoVehiculo,
        key: "id_tipo",
      },
    },
    id_estado_vehiculo: {
      type: Sequelize.INTEGER,
      reference: {
        model: stateVehicle,
        key: "id_estado_vehiculo",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Vehicle;

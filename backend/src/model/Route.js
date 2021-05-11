const Sequelize = require("sequelize");
var sequelize = require("./database");
var Vehicle = require("./Vehicle");
var StateRoute = require("./StateRoute");
var Conduct = require("./Conduct");
const City = require("./City");

var nameTable = "tbl_rutas";


var Route = sequelize.define(nameTable, {

    id_ruta:{
        type:Sequelize.INTEGER,
        primaryKey: true,

    },
    codigo_ruta: Sequelize.STRING,
    nombre_producto: Sequelize.STRING,
    referencia: Sequelize.STRING,
    cantidad: Sequelize.FLOAT,
    fecha_inicio: Sequelize.DATE,
    fecha_fin: Sequelize.DATE,
    flete: Sequelize.STRING,
    id_vehiculo: {
      type: Sequelize.INTEGER,
      // This is a reference to another model
      references: {
        model: Vehicle,
        key: "id_vehiculo",
      },
    },
    id_conductor: {
      type: Sequelize.STRING,
      references: {
        model: Conduct,
        key: "identificacion"
      },
    },
    id_estado_ruta: {
      type: Sequelize.INTEGER,
      reference: {
        model: StateRoute,
        key: "id_estado_ruta",
      },
    },
    id_origen: {
      type: Sequelize.INTEGER,
      reference: {
        model: City,
        key: "id_ciudad",
      },
    },
    id_destino: {
      type: Sequelize.INTEGER,
      reference: {
        model: City,
        key: "id_ciudad",
      },
    },    
  },
  {
    timestamps: false,
  }
);

module.exports = Route;

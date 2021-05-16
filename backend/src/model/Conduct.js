const Sequelize = require('sequelize');
var Vehiculos = require("./Vehicle")
var sequelize = require('./database');
var stateConduct = require("./StateConduct");

var nameTable = 'tbl_conductores';

var conduct = sequelize.define(nameTable, {

    identificacion:{
        type:Sequelize.STRING,
        primaryKey: true
    },
    nombre:Sequelize.STRING,
    primer_apellido:Sequelize.STRING,
    segundo_apellido:Sequelize.STRING,
    telefono_contacto:Sequelize.STRING,
    fecha_nacimiento:Sequelize.DATE,
    licencia_conduccion:Sequelize.STRING,
    fecha_curso_seguridad:Sequelize.DATE, 
    fecha_curso_industrial:Sequelize.DATE, 
    examenes_medicos:Sequelize.DATE, 
    id_vehiculo: {
        type: Sequelize.INTEGER,
        reference: {
          model: Vehiculos,
          key: "id_vehiculo",
        },
      },
    id_estado_conductor:{
      type: Sequelize.INTEGER,
      reference:{
        model:stateConduct, 
        key:"id_estado_conductor"
      }
    }  
}, {
    timestamps: false,
});

module.exports = conduct;

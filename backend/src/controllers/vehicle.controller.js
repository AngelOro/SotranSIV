const connection = require("../../dbConnection/connection");
const conn = connection();
const Vehicle = require('../model/Vehicle');

const controller = {};

controller.getVehicles = (req, res, next) => {
  conn.query(
    "SELECT V.id_vehiculo, V.placa, V.matricula, V.r_trailer, V.capacidad, V.fecha_soat, V.fecha_poliza,  V.modelo, V.fecha_tecnomecanica, MV.descripcion AS marca , TV.descripcion AS tipoVehiculo, EV.descripcion AS estadoVehiculo " +
      "FROM tbl_vehiculos AS V INNER JOIN tbl_marcas_vehiculos AS MV ON V.id_marca = MV.id_marca " +
      "INNER JOIN tbl_tipos_vehiculos AS TV ON V.id_tipo = TV.id_tipo " +
      "INNER JOIN tbl_estado_vehiculo AS EV ON V.id_estado_vehiculo = EV.id_estado_vehiculo WHERE V.id_estado_vehiculo = 1",
    (err, rows) => {
      if (err) next(new Error(err));
      else res.json({ success: true, data: rows });
    }
  );
};

controller.getTypeVehicle = (req, res, next) => {
  conn.query(
    "SELECT id_tipo, descripcion as tipoVehiculo FROM tbl_tipos_vehiculos",
    (err, rows) => {
      if (err) next(new Error(err));
      else res.json({ success: true, data: rows });
    }
  );
};

controller.getMarcaVehicle = (req, res, next) => {
  conn.query(
    "SELECT id_marca, descripcion as marcaVehiculo FROM tbl_marcas_vehiculos",
    (err, rows) => {
      if (err) next(new Error(err));
      else res.json({ success: true, data: rows });
    }
  );
};

controller.getVehicleAvailable = ( req, res, next) => {
  conn.query(
    "SELECT id_vehiculo, placa FROM tbl_vehiculos WHERE id_estado_vehiculo =  1 " ,
    (err, rows) => {
      if (err) next(new Error(err));
      else res.json({ success: true, data: rows });
    }
  );
};

controller.create = async (req, res) => {
  debugger
  const {
    placa,
    matricula,
    r_trailer,
    capacidad,
    fecha_soat,
    fecha_poliza,
    modelo,
    fecha_tecnomecanica,
    id_marca,
    id_tipo,
    id_estado_vehiculo,
  } = req.body;
  const data = await Vehicle.create({
    placa:placa,
    matricula:matricula,
    r_trailer:r_trailer,
    capacidad:capacidad,
    fecha_soat:fecha_soat,
    fecha_poliza:fecha_poliza,
    modelo:modelo,
    fecha_tecnomecanica:fecha_tecnomecanica,
    id_marca:id_marca,
    id_tipo:id_tipo,
    id_estado_vehiculo:id_estado_vehiculo,
  })
  console.log(data)
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log("Error" + error);
      return error;
    });
  // return res
  res.status(200).json({
    success: true,
    message: "Vehiculo almacenado exitosamente",
    data: data,
  });
};


controller.editVehicle = async (req,res, next) => {
  const { id_vehiculo } = req.params;

  conn.query("SELECT V.id_vehiculo, V.placa, V.matricula, V.r_trailer, V.capacidad, date_format(V.fecha_soat, '%d/%m/%Y') as fecha_soat, date_format(V.fecha_poliza, '%d/%m/%Y') as fecha_poliza,  V.modelo, date_format(V.fecha_tecnomecanica, '%d/%m/%Y') as fecha_tecnomecanica , MV.descripcion AS marca, MV.id_marca , TV.descripcion AS tipoVehiculo, TV.id_tipo, EV.descripcion AS estadoVehiculo " +
  "FROM tbl_vehiculos AS V INNER JOIN tbl_marcas_vehiculos AS MV ON V.id_marca = MV.id_marca " +
  "INNER JOIN tbl_tipos_vehiculos AS TV ON V.id_tipo = TV.id_tipo " +
  "INNER JOIN tbl_estado_vehiculo AS EV ON V.id_estado_vehiculo = EV.id_estado_vehiculo WHERE V.id_estado_vehiculo = 1 and id_vehiculo = " + req.params.id_vehiculo,(err, rows) =>{
    if (err) next(new Error(err));
    else res.json({ success: true, data: rows });
  } )
  // .then(function(data){
  //   return data;
  // })
  // .catch(error =>{
  //   return error;
  // })
  // res.json({ success: true, data: data });
}

controller.deleteVehicle = async (req, res) => {
  // parameter post
  const { id_vehiculo } = req.body;
  // delete sequelize
  conn.query("UPDATE tbl_vehiculos set id_estado_vehiculo = 3 where id_vehiculo = " + req.body.id_vehiculo, (err, rows) => {
    if(err) throw err;
    else res.json({ success: true, message:"Se elimina vehículo" });
  }
);
}

controller.vehicleEdit = async (req,res) => {
  // parameter get id
  const { id_vehiculo } = req.params;
  // parameter POST
  const {
    placa,
    matricula,
    r_trailer,
    capacidad,
    fecha_soat,
    fecha_poliza,
    modelo,
    fecha_tecnomecanica,
    id_marca,
    id_tipo,
    id_estado_vehiculo
  } = req.body;
  // Update data
  const data = await Vehicle.update({
    placa:placa,
    matricula:matricula,
    r_trailer:r_trailer,
    capacidad:capacidad,
    fecha_soat:fecha_soat,
    fecha_poliza:fecha_poliza,
    modelo:modelo,
    fecha_tecnomecanica:fecha_tecnomecanica,
    id_marca:id_marca,
    id_tipo:id_tipo,
    id_estado_vehiculo:id_estado_vehiculo,
  },
  {
    where: { id_vehiculo: id_vehiculo}
  })
  .then( function(data){
    return data;
  })
  .catch(error => {
    return error;
  }) 
  res.json({success:true, data:data, message:"Updated successful"});
}

module.exports = controller;

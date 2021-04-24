const controller = {};
const connection = require('../../dbConnection/connection')
const conn = connection()
const Shipping = require('../model/Shipping');


controller.getShipping = (req, res, next) => {
  conn.query('SELECT  E.id_rutas,E.codigo_ruta,E.nombre_producto,E.referencia,E.cantidad, '+
  ' DATE_FORMAT(E.fecha_inicio,"%d %M %Y") as fecha_inicio, E.fecha_fin, E.flete, V.placa, C.nombre , '+ 
  ' CO.descripcion as ciudad_origen, CD.descripcion as ciudad_destino, ES.descripcion as estado '+
  ' FROM tbl_rutas E  INNER JOIN tbl_vehiculos V ON V.id_vehiculo = E.id_vehiculo '+
  ' INNER JOIN tbl_conductores C ON C.identificacion = E.id_conductor  '+
  '  INNER JOIN tbl_ciudades CO ON CO.id_ciudad = E.id_origen '+
  '  INNER JOIN tbl_ciudades CD ON CD.id_ciudad = E.id_destino  '+
  '  INNER JOIN tbl_estados ES ON ES.id_estado = E.id_estado where E.id_estado = 1 ', (err, rows) => {
    if (err) next(new Error(err))
    else res.json({ success: true, data: rows })
  })
}


controller.getVehicleShipping = (req, res, next) => {
  conn.query(' SELECT E.id_rutas , v.placa  '+
    ' FROM sotransiv.tbl_rutas E  '+
    ' inner join tbl_vehiculos V on V.id_vehiculo = E.id_rutas ',
    (err, rows) => {
      if (err) next(new Error(err));
      else res.json({ success: true, data: rows });
    }
  );
};


controller.getCityShipping = (req, res, next) => {
  conn.query(
    "SELECT id_ciudad ,descripcion FROM tbl_ciudades",
    (err, rows) => {
      if (err) next(new Error(err));
      else res.json({ success: true, data: rows });
    }
  );
};

controller.deleteShipping = async (req, res) => {
  // parameter post
  const { id_rutas } = req.body;
  // delete sequelize
  conn.query("UPDATE tbl_rutas set id_estado = 7 where id_rutas = " + req.body.id_rutas, (err, rows) => {
    if(err) throw err;
    else res.json({ success: true, message:"Se elimina Envio" });
  }
);
}

controller.editShipping = async (req,res) => {
  const { id_rutas } = req.params;

  conn.query('SELECT  E.id_rutas,E.codigo_ruta,E.nombre_producto,E.referencia,E.cantidad, '+
  ' DATE_FORMAT(E.fecha_inicio,"%d %M %Y") as fecha_inicio, E.fecha_fin, E.flete, V.placa, C.nombre , '+ 
  ' CO.descripcion as ciudad_origen, CD.descripcion as ciudad_destino, ES.descripcion as estado '+
  ' FROM tbl_rutas E  INNER JOIN tbl_vehiculos V ON V.id_vehiculo = E.id_vehiculo '+
  ' INNER JOIN tbl_conductores C ON C.identificacion = E.id_conductor  '+
  '  INNER JOIN tbl_ciudades CO ON CO.id_ciudad = E.id_origen '+
  '  INNER JOIN tbl_ciudades CD ON CD.id_ciudad = E.id_destino  '+
  '  INNER JOIN tbl_estados ES ON ES.id_estado = E.id_estado where E.id_estado = ' + req.params.id_rutas,(err, rows) =>{
    if (err) next(new Error(err));
    else res.json({ success: true, data: rows });
  } )
  
}



controller.insertShipping = async (req, res) => {
  // data
  const {
    codigo_ruta,
    nombre_producto,
    referencia, 
    cantidad,
    fecha_inicio,
    fecha_fin,
    flete,
    id_vehiculo,
    id_conductor,
    id_origen,
    id_destino,
  } = req.body;
  // create
  const data = await Shipping.create({
    codigo_envio:codigo_envio,
    nombre_producto:nombre_producto,
    referencia:referencia ,
    cantidad:cantidad,
    fecha_inicio:fecha_inicio,
    fecha_fin:fecha_fin,
    flete:flete,
    id_vehiculo:id_vehiculo,
    id_conductor:id_conductor,
    id_estado:1,
    id_origen:id_origen,
    id_destino:id_destino,

  
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
    message: "Shipping almacenado exitosamente",
    data: data,
  });
};



controller.shippingEdit = async (req, res) => {
  // data
  const {id_rutas} =req.params;
  const {
    codigo_ruta,
    nombre_producto,
    referencia, 
    cantidad,
    fecha_inicio,
    fecha_fin,
    flete,
    id_vehiculo,
    id_conductor,
    id_origen,
    id_destino,
  } = req.body;
  // create
  const data = await Shipping.update({
    codigo_ruta:codigo_ruta,
    nombre_producto:nombre_producto,
    referencia:referencia ,
    cantidad:cantidad,
    fecha_inicio:fecha_inicio,
    fecha_fin:fecha_fin,
    flete:flete,
    id_vehiculo:id_vehiculo,
    id_conductor:id_conductor,
    id_estado:1,
    id_origen:id_origen,
    id_destino:id_destino,

  
  },
  {
    where: { id_rutas: id_rutas}
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

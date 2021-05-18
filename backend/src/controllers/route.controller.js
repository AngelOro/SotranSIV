const controller = {};
const connection = require('../../dbConnection/connection')
const conn = connection()
const Route = require('../model/Route');


controller.getRoute = (req, res, next) => {
  conn.query('SELECT  E.id_ruta,E.codigo_ruta,E.nombre_producto,E.referencia,E.cantidad,  '+
  ' DATE_FORMAT(E.fecha_inicio,"%d %M %Y") as fecha_inicio, '+
  ' E.fecha_fin, E.flete,  Conductores.placa,Conductores.nombre,  CO.descripcion as ciudad_origen,  '+ 
  ' CD.descripcion as ciudad_destino, '+
  ' ES.descripcion as estado  '+
  ' FROM tbl_rutas E  '+
  '      INNER JOIN   (SELECT C.id_vehiculo, V.placa , C.identificacion, C.nombre '+
  '                 FROM tbl_conductores C  '+
  '                 INNER JOIN tbl_vehiculos V ON V.id_vehiculo = C.id_vehiculo ) as Conductores	'+
  '                                   ON Conductores.identificacion = E.id_conductor  '+
  '      INNER JOIN tbl_ciudades CO ON CO.id_ciudad = E.id_origen  '+
  '      INNER JOIN tbl_ciudades CD ON CD.id_ciudad = E.id_destino   '+
  '      INNER JOIN tbl_estado_ruta ES ON ES.id_estado_ruta = E.id_estado_ruta where E.id_estado_ruta = 1 ', (err, rows) => {
    if (err) next(new Error(err))
    else res.json({ success: true, data: rows })
  })
}


controller.getVehicleRoute = (req, res, next) => {
  conn.query('  SELECT  C.identificacion,C.id_vehiculo, V.placa  '+
  ' FROM tbl_conductores C  '+
  ' INNER JOIN tbl_vehiculos V ON V.id_vehiculo = C.id_vehiculo ',
    (err, rows) => {
      if (err) next(new Error(err));
      else res.json({ success: true, data: rows });
    }
  );
};

controller.getConductRoute = (req, res, next) => {
  conn.query('  SELECT   C.identificacion,C.id_vehiculo, V.placa  '+
  ' FROM tbl_conductores C  '+
  ' INNER JOIN tbl_vehiculos V ON V.id_vehiculo = C.id_vehiculo ',
    (err, rows) => {
      if (err) next(new Error(err));
      else res.json({ success: true, data: rows });
    }
  );
};


controller.getCityRoute = (req, res, next) => {
  conn.query(
    "SELECT id_ciudad ,descripcion FROM tbl_ciudades",
    (err, rows) => {
      if (err) next(new Error(err));
      else res.json({ success: true, data: rows });
    }
  );
};


controller.getStateRoute = (req, res, next) => {
  conn.query(
    "SELECT id_estado_ruta ,descripcion FROM tbl_estado_ruta",
    (err, rows) => {
      if (err) next(new Error(err));
      else res.json({ success: true, data: rows });
    }
  );
};

controller.deleteRoute = async (req, res) => {
  // parameter post
  const { id_ruta } = req.body;
  // delete sequelize
  conn.query("UPDATE tbl_rutas set id_estado_ruta = 2 where id_ruta = " + req.body.id_ruta, (err, rows) => {
    if(err) throw err;
    else res.json({ success: true, message:"Se elimina Envio" });
  }
);
}

controller.editRoute = async (req,res,next) => {
  const { id_ruta } = req.params;

  conn.query('SELECT  E.id_ruta,E.codigo_ruta,E.nombre_producto,E.referencia,E.cantidad,  '+
  ' DATE_FORMAT(E.fecha_inicio,"%d %M %Y") as fecha_inicio, '+
  ' E.fecha_fin, E.flete, Conductores.identificacion,Conductores.id_vehiculo, Conductores.placa,Conductores.nombre, CO.id_ciudad as id_ciudad_origen, CO.descripcion as ciudad_origen,  '+ 
  ' CD.id_ciudad as id_ciudad_destino, CD.descripcion as ciudad_destino, '+
  ' ES.id_estado_ruta , ES.descripcion as estado  '+
  ' FROM tbl_rutas E  '+
  '      INNER JOIN   (SELECT C.id_vehiculo, V.placa , C.identificacion, C.nombre '+
  '                 FROM tbl_conductores C  '+
  '                 INNER JOIN tbl_vehiculos V ON V.id_vehiculo = C.id_vehiculo ) as Conductores	'+
  '                                   ON Conductores.identificacion = E.id_conductor  '+
  '      INNER JOIN tbl_ciudades CO ON CO.id_ciudad = E.id_origen  '+
  '      INNER JOIN tbl_ciudades CD ON CD.id_ciudad = E.id_destino   '+
  '      INNER JOIN tbl_estado_ruta ES ON ES.id_estado_ruta = E.id_estado_ruta where E.id_ruta ='+ req.params.id_ruta,(err, rows) =>{
    if (err) next(new Error(err));
    else res.json({ success: true, data: rows });
  } )
  
}



controller.insertRoute = async (req, res) => {
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
    id_estado_ruta,
    id_origen,
    id_destino,
  } = req.body;
  // create
  const data = await Route.create({
    codigo_ruta:codigo_ruta,
    nombre_producto:nombre_producto,
    referencia:referencia ,
    cantidad:cantidad,
    fecha_inicio:fecha_inicio,
    fecha_fin:fecha_fin,
    flete:flete,
    id_vehiculo:id_vehiculo,
    id_conductor:id_conductor,
    id_estado_ruta:id_estado_ruta,
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
    message: "Route almacenado exitosamente",
    data: data,
  });
};



controller.routeEdit = async (req, res) => {
  // data
  const {id_ruta} =req.params;
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
    id_estado_ruta,
    id_origen,
    id_destino,
  } = req.body;
  // create
  const data = await Route.update({
    codigo_ruta:codigo_ruta,
    nombre_producto:nombre_producto,
    referencia:referencia ,
    cantidad:cantidad,
    fecha_inicio:fecha_inicio,
    fecha_fin:fecha_fin,
    flete:flete,
    id_vehiculo:id_vehiculo,
    id_conductor:id_conductor,
    id_estado_ruta:id_estado_ruta,
    id_origen:id_origen,
    id_destino:id_destino,

  
  },
  {
    where: { id_ruta: id_ruta}
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

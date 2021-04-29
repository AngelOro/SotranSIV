drop table tbl_consumo_vehiculo;
drop table tbl_detalle_producto;
drop table tbl_envios;
drop table tbl_vehiculo_asignado;
drop table tbl_vehiculos;
drop table tbl_conductores;
drop table tbl_productos;
drop table tbl_estados;
drop table tbl_ciudades;
drop table tbl_tipos_consumos;
drop table tbl_tipos_vehiculos;
drop table tbl_marcas_vehiculos;
drop table tbl_usuarios;

create table tbl_marcas_vehiculos(
	id_marca integer not null,
	descripcion varchar(50) not null,
	constraint pk_marca primary key (id_marca)
);

create table tbl_tipos_vehiculos(
	id_tipo integer not null,
    descripcion varchar(70) not null,
    constraint pk_tipo_vehiculo primary key (id_tipo)
);

create table tbl_departamentos(
	id_departamento integer NOT NULL AUTO_INCREMENT,
    descripcion varchar(20), 
    constraint pk_id_departamento primary key(id_departamento)
);

create table tbl_ciudades(
	id_ciudad integer not null,
    descripcion varchar(60) not null,
    id_departamento integer not null, 
    constraint pk_ciudad primary key (id_ciudad), 
	constraint pk_id_departamento foreign key (id_departamento) references tbl_departamentos(id_departamento)
);

create table tbl_estados(
	id_estado integer not null,
    descripcion varchar(50) not null,
    constraint pk_estado primary key (id_estado)
);

create table tbl_vehiculos(
	id_vehiculo integer(11)  NOT NULL AUTO_INCREMENT,
    placa varchar(20) not null,
    matricula varchar(20) not null,
    r_trailer varchar(20) ,
    capacidad varchar(20) not null,
    fecha_soat date not null,
    fecha_poliza date not null,
    modelo varchar(10) not null,
    fecha_tecnomecanica date not null,
    id_marca integer not null, 
	id_tipo integer not null,
    id_estado integer not null,
    constraint pk_vehiculo primary key (id_vehiculo),
    constraint fk_marca foreign key (id_marca) references tbl_marcas_vehiculos(id_marca),
    constraint fk_tipo_vehiculo foreign key (id_tipo) references tbl_tipos_vehiculos(id_tipo),
    constraint fk_estado foreign key (id_estado) references tbl_estados(id_estado)
);

create table tbl_conductores (
	identificacion varchar(15) not null,
	nombre varchar(60) not null,
	primer_apellido varchar(30) not null,
	segundo_apellido varchar(30) ,
	telefono_contacto varchar(15) not null,
	fecha_nacimiento date not null,
	licencia_conduccion varchar(30) not null,
    fecha_curso_seguridad date,
    fecha_curso_industrial date,
    examenes_medicos date not null,
    id_vehiculo integer not null,
	constraint pk_identificacion primary key (identificacion),
    constraint fk_vehiculo foreign key (id_vehiculo) references tbl_vehiculos(id_vehiculo)
);



create table tbl_gastos_viaje(
	id_gasto integer NOT NULL AUTO_INCREMENT,
    vehiculo integer,
    fecha_realizado date not null,
    valor_gasto integer not null,
    descripcion varchar (255) not null,
    codigo_factura varchar(15) not null,
    nombre_empresa varchar(30) not null,
    constraint pk_detalle_gasto primary key (id_gasto),
    constraint fk_vehiculo_gesto foreign key (vehiculo) references tbl_vehiculos(id_vehiculo)
);

create table tbl_mantenimiento_vehiculo(
	id_mantenimiento integer  NOT NULL AUTO_INCREMENT,
    vehiculo integer,
    fecha_realizado date not null,
    valor_mantenimiento integer not null,
    descripcion varchar (255) not null,
    codigo_factura varchar(15) not null,
    nombre_empresa varchar(30) not null,
    constraint pk_detalle_mantenimiento primary key (id_mantenimiento),
    constraint fk_vehiculo_mantenimiento foreign key (vehiculo) references tbl_vehiculos(id_vehiculo)
);


create table tbl_rutas(
	id_rutas integer NOT NULL AUTO_INCREMENT,
    codigo_ruta varchar(30),
    nombre_producto varchar(50),
    referencia varchar(50),
    cantidad float,
    fecha_inicio date not null,
    fecha_fin date,
    flete integer not null,
    id_vehiculo integer not null,
    id_conductor varchar(15) not null,
    id_estado integer not null,
    id_origen integer not null,
    id_destino integer not null,
    constraint pk_rutas primary key (id_rutas),
    constraint fk_estado_ruta foreign key (id_estado) references tbl_estados(id_estado),
    constraint fk_origen foreign key (id_origen) references tbl_ciudades(id_ciudad),
    constraint fk_destino foreign key (id_destino) references tbl_ciudades(id_ciudad),
    constraint fk_vehiculo_ruta foreign key (id_vehiculo) references tbl_vehiculos(id_vehiculo),
    constraint fk_conductor_ruta foreign key (id_conductor) references tbl_conductores(identificacion)
);

create table tbl_roles (
	id_rol integer not null,
    descripcion varchar(20) not null,
    constraint pk_rol primary key (id_rol)
);

create table tbl_usuarios (
  id_usuarios      int(11)     unsigned NOT NULL AUTO_INCREMENT,
  usuario   varchar(30)  not null,
  clave    varchar(50)  not null,
  id_rol integer not null,
  constraint pk_usuarios PRIMARY KEY (id_usuarios),
  constraint fk_rol foreign key (id_rol) references tbl_roles(id_rol)
);


--INSERTS
INSERT INTO tbl_roles VALUES ('1', 'ADMINISTRADOR');
INSERT INTO tbl_roles VALUES ('2', 'NORMAL');

INSERT INTO tbl_usuarios VALUES ('1', 'esteban2021', '1234567', '1');
INSERT INTO tbl_usuarios VALUES ('2', 'edwar2021', '1234567', '1');
INSERT INTO tbl_usuarios VALUES ('3', 'angelica', '1234567', '1');
INSERT INTO tbl_usuarios VALUES ('4', 'ingreso.01', '1234567', '2');

INSERT INTO tbl_tipos_vehiculos VALUES (1, "Carroceria");
INSERT INTO tbl_tipos_vehiculos VALUES (2, "Remolque");
INSERT INTO tbl_tipos_vehiculos VALUES (3, "Cisterna");
INSERT INTO tbl_tipos_vehiculos VALUES (4, "Contenedor");

INSERT INTO tbl_marcas_vehiculos VALUES (1, "KENWORTH");
INSERT INTO tbl_marcas_vehiculos VALUES (2, "MACK");
INSERT INTO tbl_marcas_vehiculos VALUES (3, "FREIGHTLINER");

INSERT INTO tbl_estados VALUES (1, "Activo");
INSERT INTO tbl_estados VALUES (2, "Inactivo");
INSERT INTO tbl_estados VALUES (3, "En proceso");
INSERT INTO tbl_estados VALUES (4, "Entregado");
INSERT INTO tbl_estados VALUES (5, "Disponible");
INSERT INTO tbl_estados VALUES (6, "Ocupado");

INSERT INTO tbl_vehiculos (placa, matricula, r_trailer, capacidad, fecha_soat, fecha_poliza, modelo, fecha_tecnomecanica, id_marca, id_tipo, id_estado)
values ( "SAW-098", "873291JG", null, "17", sysdate(), sysdate(), "2015", sysdate(), 3, 2, 1),
( "HSJ-857", "621732JS", "R-6821", "12", sysdate(), sysdate(), "2009", sysdate(), 1, 3, 1),
( "JSA-892", "739214HJ", null, "26", sysdate(), sysdate(), "2019", sysdate(), 3, 2, 1),
( "SIW-972", "372479KI", "R-7974", "30", sysdate(), sysdate(), "2003", sysdate(), 2, 1, 2),
( "SWE-398", "7328142UH", "R-8976", "13", sysdate(), sysdate(), "2005", sysdate(), 1, 3, 2),
( "CIR-233", "789432IL", null, "25", sysdate(), sysdate(), "2017", sysdate(), 1, 4, 1);

INSERT INTO tbl_departamentos VALUES ('1', 'Amazonas');
INSERT INTO tbl_departamentos VALUES ('2', 'Antioquia');
INSERT INTO tbl_departamentos VALUES ('3', 'Arauca ');
INSERT INTO tbl_departamentos VALUES ('4', 'Atlantico');
INSERT INTO tbl_departamentos VALUES ('5', 'Bogota');
INSERT INTO tbl_departamentos VALUES ('6', 'Bolivar');
INSERT INTO tbl_departamentos VALUES ('7', 'Boyaca');
INSERT INTO tbl_departamentos VALUES ('8', 'Caldas');
INSERT INTO tbl_departamentos VALUES ('9', 'Caqueta');
INSERT INTO tbl_departamentos VALUES ('10', 'Casanare');
INSERT INTO tbl_departamentos VALUES ('11', 'Cauca');
INSERT INTO tbl_departamentos VALUES ('12', 'Cesar');
INSERT INTO tbl_departamentos VALUES ('13', 'Choco');
INSERT INTO tbl_departamentos VALUES ('14', 'Cordoba');
INSERT INTO tbl_departamentos VALUES ('15', 'Cundinamarca');
INSERT INTO tbl_departamentos VALUES ('16', 'Guainia');
INSERT INTO tbl_departamentos VALUES ('17', 'Guaviare');
INSERT INTO tbl_departamentos VALUES ('18', 'Huila');
INSERT INTO tbl_departamentos VALUES ('19', 'La guajira');
INSERT INTO tbl_departamentos VALUES ('20', 'Magdalena');
INSERT INTO tbl_departamentos VALUES ('21', 'Meta');
INSERT INTO tbl_departamentos VALUES ('22', 'Nariño');
INSERT INTO tbl_departamentos VALUES ('23', 'Norte de santander');
INSERT INTO tbl_departamentos VALUES ('24', 'Putumayo');
INSERT INTO tbl_departamentos VALUES ('25', 'Quindio');
INSERT INTO tbl_departamentos VALUES ('26', 'Risaralda');
INSERT INTO tbl_departamentos VALUES ('27', 'Santander');
INSERT INTO tbl_departamentos VALUES ('28', 'Sucre');
INSERT INTO tbl_departamentos VALUES ('29', 'Tolima');
INSERT INTO tbl_departamentos VALUES ('30', 'Valle del cauca');
INSERT INTO tbl_departamentos VALUES ('31', 'Vaupes');
INSERT INTO tbl_departamentos VALUES ('32', 'Vichada');

INSERT INTO tbl_conductores VALUES ('1040759456', 'Gerardo', 'Arias', 'Osorio', '3203400625', '1999/11/10', 'LC1234567890', '2021/02/19', '2021/02/19', '2021/01/20', '1');
INSERT INTO tbl_conductores VALUES ('3213432345', 'Alejandro', 'Lopez', 'Castro', '3138370978', '1979/09/01', 'LC0987653631', '2019/06/10', '2019/11/04', '2021/04/10', '2');
INSERT INTO tbl_conductores VALUES ('2454123432', 'Fernando', 'Betancur', null, '5438987389', '1969/08/13', 'LC5672367783', '2018/12/20', '2020/01/14', '2018/11/30', '3');

INSERT INTO tbl_ciudades VALUES (1, "Medellin", 2);
INSERT INTO tbl_ciudades VALUES (2, "Bogota", 15);
INSERT INTO tbl_ciudades VALUES (3, "Cartagena", 6);

INSERT INTO tbl_gastos_viaje (vehiculo, fecha_realizado, valor_gasto, descripcion, codigo_factura, nombre_empresa)
VALUES ( 1, sysdate(), 30000, "Peaje", "001", "Cocorna"),
( 3, sysdate(), 30000, "Peaje", "002", "Cocorna"),
( 1, sysdate(), 200000, "ACPM", "003", "Texaco Guayabal");

insert into tbl_mantenimiento_vehiculo (vehiculo, fecha_realizado, valor_mantenimiento, descripcion, codigo_factura, nombre_empresa)
values ( 1, sysdate(), 300000, "Cambio de llantas", "001", "Marllantas"),
( 3, sysdate(), 200000, "Mantenimiento motor", "002", "Taller la 80");


INSERT INTO tbl_rutas (id_rutas, codigo_ruta, nombre_producto, referencia, cantidad, fecha_inicio, fecha_fin, flete, id_vehiculo, id_conductor , id_estado, id_origen, id_destino)
VALUES (1,'co1234','cemento','f32',25,'1995-01-29','2000-01-29',5000, 1,"1040759456",2,2,1);

insert into tbl_rutas (id_rutas, codigo_ruta, nombre_producto, referencia, cantidad, fecha_inicio, fecha_fin, flete, id_vehiculo, id_conductor , id_estado, id_origen, id_destino)
values (2,'co1234','cemento','f32',25,'1995-01-29','2000-01-29',5000, 1,"3213432345",2,2,1);


select id_rol from tbl_usuarios where usuario = "esteban2021" and clave = "1234567";
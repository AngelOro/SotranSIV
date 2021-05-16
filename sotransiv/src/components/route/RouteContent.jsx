import React, { Component } from "react";
import "../../styles/ShippingContent.css";
import { link, Link } from "react-router-dom";
import Axios from "axios";
import Modal from 'react-awesome-modal';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


class RouteContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      routeData: [],
      vehicleData: [],
      cityOriginData: [],
      cityDestinationData: [],
      routeEdit: [],
      stateRoute: [],
      stateData: [],
      conductData: [],
      visible: false,
      routeBackup: {},
      stateBackup: {},
      textBuscar: "",
      id_ruta: "",
      codigo_ruta: "",
      nombre_producto: "",
      referencia: "",
      cantidad: "",
      fecha_inicio: "",
      fecha_fin: "",
      placa: "",
      flete: "",
      ciudad_origen: "",
      ciudad_destino: "",
      estado: "",
      identificacion: "",
      descripcion: "",
      select_state: 0,
      select_vehicle: 0,
      select_conduct: 0,
      select_ciudad_origen: 0,
      select_ciudad_destino: 0,
      visible_actualizar: true,
      visible_registrar: true,

    };
  }


  openModal() {
    this.setState({
      visible: true,
      visible_actualizar: true,
      visible_registrar: false,

    });
  }


  openModalEditar(id_ruta) {
    this.setState({
      visible: true,
      visible_actualizar: false,
      visible_registrar: true,
    })
    //id_vehiculo = this.props.match.params.id_vehiculo;
    const url = "http://localhost:3001/Route/editRoute/" + id_ruta
    Axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data[0]
          console.log(data);
          this.setState({
            routeEdit: data,
            codigo_ruta: data.codigo_ruta,
            nombre_producto: data.nombre_producto,
            referencia: data.referencia,
            cantidad: data.cantidad,
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin,
            flete: data.flete,
            id_vehiculo: data.select_vehicle,
            id_conductor: data.select_conductor,
            id_estado_ruta: data.select_state,
            id_origen: data.select_ciudad_origen,
            id_destino: data.select_ciudad_destino,
            id_ruta: data.id_ruta

          })
        }
        else {
          alert("Error Edit Server")
        }
      })
      .catch(error => {
        alert("Error server " + error)
      })
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }


  _fetchData() {
    Axios.get("http://localhost:3001/Route/")
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          this.setState({
            loading: false,
            routeData: data,
            routeBackup: data,
          });
        } else {
          alert("sorry");
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: isNaN,
        });
      });
  }

  _fetchRouteVehicle() {
    Axios.get("http://localhost:3001/Route/vehicleRoute")
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          this.setState({
            loading: false,
            vehicleData: data,
            vehiculoBackup: data,
          });
        } else {
          alert("Sorry");
        }
      })
      .catch((error) => {
        alert("Error" + error);
        this.setState({
          loading: false,
          error: isNaN,
        });
      });
  }

  _fetchConductVehicle() {
    Axios.get("http://localhost:3001/Route/conductRoute")
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          this.setState({
            loading: false,
            conductData: data,
            conductBackup: data,
          });
        } else {
          alert("Sorry");
        }
      })
      .catch((error) => {
        alert("Error" + error);
        this.setState({
          loading: false,
          error: isNaN,
        });
      });
  }


  _fetchRouteState() {
    Axios.get("http://localhost:3001/Route/stateRoute")
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          this.setState({
            loading: false,
            stateData: data,
            stateBackup: data,
          });
        } else {
          alert("Sorry");
        }
      })
      .catch((error) => {
        alert("Error" + error);
        this.setState({
          loading: false,
          error: isNaN,
        });
      });
  }


  _fetchCityOriginRoute() {
    Axios.get("http://localhost:3001/Route/cityRoute")
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          this.setState({
            loading: false,
            cityOriginData: data,
            cityOriginBackup: data,
          });
        } else {
          alert("Sorry");
        }
      })
      .catch((error) => {
        alert("Error" + error);
        this.setState({
          loading: false,
          error: isNaN,
        });
      });
  }

  _fetchCityDestinationRoute() {
    Axios.get("http://localhost:3001/Route/cityRoute")
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          this.setState({
            loading: false,
            cityDestinationData: data,
            cityDestinationBackup: data,
          });
        } else {
          alert("Sorry");
        }
      })
      .catch((error) => {
        alert("Error" + error);
        this.setState({
          loading: false,
          error: isNaN,
        });
      });
  }

  filter(event) {
    var text = event.target.value;
    const data = this.state.routeBackup;
    const newData = data.filter(function (item) {
      const itemData = item.codigo_ruta.toUpperCase();
      const itemDataDescp = item.nombre_producto.toUpperCase();
      const campo = itemData + " " + itemDataDescp;
      const textData = text.toUpperCase();
      return campo.indexOf(textData) > -1;
    });
    this.setState({
      routeData: newData,
      textBuscar: text,
    });
  }

  componentDidMount() {
    this._fetchData();
    this._fetchCityOriginRoute();
    this._fetchCityDestinationRoute();
    this._fetchRouteVehicle();
    this._fetchRouteState();
    this._fetchConductVehicle();
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler() {
    //const baseUrl = "https://sotransiv-app.herokuapp.com/Vehicle/newVehicle"
    const baseUrl = "http://localhost:3001/Route/newRoute"
    debugger
    const datapost = {
      codigo_ruta: this.state.codigo_ruta,
      nombre_producto: this.state.nombre_producto,
      referencia: this.state.referencia,
      cantidad: this.state.cantidad,
      fecha_inicio: this.state.fecha_inicio,
      fecha_fin: this.state.fecha_fin,
      flete: this.state.flete,
      id_vehiculo: this.state.select_vehicle,
      id_conductor: this.state.select_conduct,
      id_estado_ruta: this.state.select_state,
      id_origen: this.state.select_ciudad_origen,
      id_destino: this.state.select_ciudad_destino

    }
    debugger
    console.log(datapost);
    Axios.post(baseUrl, datapost)
      .then(response => {
        if (response.data.success === true) {
          alert(response.data.message)
        } else {
          alert(response.data.message)
        }
      }).catch(error => {
        alert("Error 34 " + error)
      })

  };

  onDelete(id) {
    Swal.fire({
      title: 'Eliminar Ruta',
      text: '¿Está seguro de eliminar Ruta?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se eliminó Ruta',
          'error'
        )
      }
    })
  }

  sendDelete(id_ruta) {
    // url de backend
    const baseUrl = "http://localhost:3001/Route/deleteRoute"    // parameter data post
    // network
    Axios.post(baseUrl, {
      id_ruta: id_ruta
    })
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            'Eliminado',
            'La Ruta fue eliminado',
            'success'
          )
          this._fetchData();
        }
      })
      .catch(error => {
        alert("Error  en linea 247 ")
      })
  }


  sendUpdate() {
    //  get parameter id
    let id_ruta = this.state.id_ruta;
    console.log(id_ruta);
    // url de backend
    const baseUrl = "http://localhost:3001/Route/RouteEdit/" + id_ruta
    // parametros de datos post
    const datapost = {
      codigo_ruta: this.state.codigo_ruta,
      nombre_producto: this.state.nombre_producto,
      referencia: this.state.referencia,
      cantidad: this.state.cantidad,
      fecha_inicio: this.state.fecha_inicio,
      fecha_fin: this.state.fecha_fin,
      flete: this.state.flete,
      id_vehiculo: this.state.select_vehicle,
      id_conductor: this.state.select_conduct,
      id_estado_ruta: this.state.select_state,
      id_origen: this.state.select_ciudad_origen,
      id_destino: this.state.select_ciudad_destino
    }
    debugger

    Axios.put(baseUrl, datapost)
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });

  }



  render() {
    const {
      id_ruta,
      codigo_ruta,
      nombre_producto,
      referencia,
      cantidad,
      flete,
      fecha_inicio,
      fecha_fin,
      id_vehiculo,
      id_conductor,
      id_estado_ruta,
      ciudad_destino,
      ciudad_origen,
      select_vehicle,
      select_conduct,
      select_state,
      select_ciudad_destino,
      select_ciudad_origen,

    } = this.state;

    if (this.state.loading) {
      return (
        <div className="App">
          <h1>Cargando...</h1>
        </div>
      );
    }

    if (this.state.error !== null) {
      return <h1>Error</h1>;
    }

    return (
      <div className="container">
        <h3 className="tittle">Rutas</h3>
        <div className="row" id="row-container">
          <div className="col-md-10">
            <div className="form-row" id="form-input">
              <input
                className="input-search"
                type="text"
                placeholder="Buscar"
                value={this.state.text}
                onChange={(text) => this.filter(text)}
              />
              <a className="nav-link" href="#">
                <i className="icon ion-md-search lead mr-2"></i>
              </a>
            </div>
          </div>

          <div className="col-md-2 btn-new">

            <button
              type="button"
              className="btn-3 btn-primary "
              id="btn-search"
              value="Open"
              onClick={() => this.openModal()}
            >
              + Nuevo

              </button>

          </div>
        </div>
        <section>
          <Modal visible={this.state.visible}
            width="950"
            height="700"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}>
            <div>
              <div className="container">
                <div clasName="row">
                  <h3 className="title">Registar Ruta</h3>

                </div>
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCodEnvio">Codigo de Ruta</label>
                      <input
                        type="text"
                        className="form-control"
                        name="codigo_ruta"
                        value={codigo_ruta}
                        onChange={this.changeHandler}
                        required
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputValorEnvio">Flete</label>
                      <input
                        type="text"
                        className="form-control"
                        name="flete"
                        value={flete}
                        onChange={this.changeHandler}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputNombreProducto">Nombre Producto</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre_producto"
                        value={nombre_producto}
                        
                        onChange={this.changeHandler}
                        required
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputVehiculoAsignado">Vehiculo Asignado</label>
                      <select
                        className="form-control"
                        name="select_vehicle"
                        value={select_vehicle}
                        onChange={this.changeHandler}
                        required
                      >
                        <option value="0">Seleccionar</option>
                        {this.state.vehicleData.map((vehicle) => (
                          <option value={vehicle.id_vehiculo}>
                            {vehicle.placa}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputReferencia">Referencia</label>
                      <input
                        type="text"
                        className="form-control"
                        name="referencia"
                        value={referencia}
                        onChange={this.changeHandler}
                        required
                       
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCantidad">Cantidad</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cantidad"
                        value={cantidad}
                        onChange={this.changeHandler}
                        required

                      />
                    </div>
                  </div>
                  <div class="form-row">

                  <div class="form-group col-md-6">
                      <label for="inputVehiculoAsignado">Estado ruta</label>
                      <select
                        className="form-control"
                        name="select_state"
                       
                        value={select_state}
                        onChange={this.changeHandler}
                        required
                        
                      >
                        <option value="0">Seleccionar</option>
                        {this.state.stateData.map((state) => (
                          <option value={state.id_estado_ruta}>
                            {state.descripcion}
                          </option>
                        ))}
                      </select>
                    </div>    

                    <div class="form-group col-md-6">
                      <label for="inputVehiculoAsignado">Conductor Asignado</label>
                      <select
                        className="form-control"
                        name="select_conduct"
                        value={select_conduct}
                        onChange={this.changeHandler}
                        required
                       
                      >
                        <option value="0">Seleccionar</option>
                        {this.state.conductData.map((conduct) => (
                          <option value={conduct.identificacion}>
                            {conduct.identificacion}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div class="form-row">

                    <div class="form-group col-md-3">
                      <label for="inputState">Ciudad Origen</label>
                      <select
                        className="form-control"
                        
                        name="select_ciudad_origen"
                        value={select_ciudad_origen}
                        onChange={this.changeHandler}
                        required
                       
                        
                      >
                        <option value="0">Seleccionar</option>
                        {this.state.cityOriginData.map((cityOrigin) => (
                          <option value={cityOrigin.id_ciudad}>
                            {cityOrigin.descripcion}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div class="form-group col-md-3">
                      <label for="inputState">Ciudad Destino</label>
                      <select
                        className="form-control"
                        
                        name="select_ciudad_destino"
                        value={select_ciudad_destino}
                        onChange={this.changeHandler}
                        required
                      >
                        <option value="0">Seleccionar</option>
                        {this.state.cityDestinationData.map((city) => (
                          <option value={city.id_ciudad}>
                            {city.descripcion}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div class="form-group col-md-3">
                      <label for="inputState">Fecha Inicio</label>
                      <input
                        className="form-control"
                        type="date"
                        name="fecha_inicio"
                        value={fecha_inicio}
                        onChange={this.changeHandler}
                        required
                      />
                    </div>

                    <div class="form-group col-md-3">
                      <label for="inputState">Fecha Fin</label>
                      <input
                        className="form-control"
                        type="date"
                        name="fecha_fin"
                        value={fecha_fin}
                        onChange={this.changeHandler}
                        required
                      />
                    </div>

                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="gridCheck">
                      </input>
                      <label class="form-check-label" for="gridCheck">
                        Check me out
              </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary btn-formvehicle"
                    onClick={() => this.submitHandler()}
                  >
                    Registrar
                    </button>
                  <button type="submit" class="btn btn-primary" href="javascript:void(0);" onClick={() => this.closeModal()}>Cerrar</button>
                </form>
              </div>

            </div>
          </Modal>
        </section>

        <table className="table table-striped" id="tableShipping" >
          <thead className="head-table">
            <tr>
              <th className="th-shipping" scope="col">Codigo Ruta</th>
              <th className="th-shipping" scope="col">Carga</th>
              <th className="th-shipping" scope="col">Flete</th>
              <th className="th-shipping" scope="col">Vehiculo Asignado</th>
              <th className="th-shipping" scope="col">Ciudad Origen</th>
              <th className="th-shipping" scope="col">Ciudad Destino</th>
              <th className="th-shipping" scope="col">Estado Envio</th>
              <th className="th-shipping" colSpan="2">Acciones</th>

            </tr>
          </thead>
          <tbody className="body-table-shipping">
            {this.state.routeData.map((data) => (
              <tr className="tr-Shipping">

                <td scope="col">{data.codigo_ruta}</td>
                <td>{data.nombre_producto}</td>
                <td>{data.flete}</td>
                <td>{data.placa}</td>
                <td>{data.ciudad_origen}</td>
                <td>{data.ciudad_destino}</td>
                <td>{data.estado}</td>
                <td id="td-actions">

                  <button
                    type="button"
                    className="btn-3 btn-primary "
                    id="btn-asignar"
                    value="Open"
                    onClick={() => this.openModalEditar(data.id_ruta)}
                  >
                    Editar
                  </button>
                </td>
                <td id="td-actions">
                  <button
                    type="button"
                    className="btn-3 btn-primary "
                    id="btn-eliminar"
                    value="Open"
                    onClick={() => this.onDelete(data.id_ruta)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default RouteContent;

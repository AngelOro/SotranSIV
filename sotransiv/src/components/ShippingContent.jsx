import React, { Component } from "react";
import "../styles/ShippingContent.css";
import { link, Link } from "react-router-dom";
import Axios from "axios";
import Modal from 'react-awesome-modal';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


class ShippingContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      shippingData: [],
      vehicleData: [],
      cityData: [],
      shippingEdit: [],
      visible: false,
      shippingBackup: {},
      textBuscar: "",
      id_rutas: "",
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
      select_vehicle: 0,
      select_conduct: 0,
      select_ciudad_origen: 0,
      select_ciudad_destino: 0,
      visible_actualizar: true,
      visible_registrar:true,

    };
  }


  openModal() {
    this.setState({
      visible: true,
      visible_actualizar: true,
      visible_registrar:false,
   
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  openModalEditar(id_rutas) {
    this.setState({
      visible: true,
      visible_actualizar: false,
      visible_registrar:true,
    })
    //id_vehiculo = this.props.match.params.id_vehiculo;
    const url = "http://localhost:3001/Shipping/editShipping/"+id_rutas
    Axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        console.log(data);
        this.setState({
          shippingEdit:data,
              id_rutas:data.id_rutas,
              codigo_ruta: data.codigo_ruta,
              nombre_producto: data.nombre_producto,
              referencia: data.referencia, 
              cantidad: data.cantidad,
              fecha_inicio: data.fecha_inicio,
              fecha_fin: data.fecha_fin,
              flete: data.flete,
              id_vehiculo: data.select_vehicle,
              id_conductor: data.select_conductor,
              id_origen:data.select_ciudad_origen,
              id_destino:data.select_ciudad_destino
         
        })
      }
      else {
        alert("Error Edit Server")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }


  _fetchData() {
    Axios.get("http://localhost:3001/Shipping/")
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          this.setState({
            loading: false,
            shippingData: data,
            shippingBackup: data,
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

  _fetchShippingVehicle() {
    Axios.get("http://localhost:3001/Shipping/vehicleShipping")
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


  _fetchCityShipping() {
    Axios.get("http://localhost:3001/Shipping/cityShipping")
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          this.setState({
            loading: false,
            cityData: data,
            cityBackup: data,
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
    const data = this.state.shippingBackup;
    const newData = data.filter(function (item) {
      const itemData = item.codigo_envio.toUpperCase();
      const itemDataDescp = item.nombre_producto.toUpperCase();
      const campo = itemData + " " + itemDataDescp;
      const textData = text.toUpperCase();
      return campo.indexOf(textData) > -1;
    });
    this.setState({
      shippingData: newData,
      textBuscar: text,
    });
  }

  componentDidMount() {
    this._fetchData();
    this._fetchCityShipping();
    this._fetchShippingVehicle();
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler () {
    //const baseUrl = "https://sotransiv-app.herokuapp.com/Vehicle/newVehicle"
    const baseUrl = "http://localhost:3001/Shipping/newShipping"
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
              id_origen:this.state.select_ciudad_origen,
              id_destino:this.state.select_ciudad_destino
                
            }
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

  onDelete(id){
    Swal.fire({
      title: 'Eliminar Envio',
      text: '¿Está seguro de eliminar Envio?',
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
          'No se eliminó Envio',
          'error'
        )
      }
    })
  }

  sendDelete(id_rutas)
  {
    // url de backend
    const baseUrl = "http://localhost:3001/Shipping/deleteShipping"    // parameter data post
    // network
    Axios.post(baseUrl,{
      id_rutas:id_rutas
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Eliminado',
          'El Envio fue eliminado',
          'success'
        )
        this._fetchData();
      }
    })
    .catch ( error => {
      alert("Error  en linea 247 ")
    })
  }

  
  sendUpdate(){
    //  get parameter id
    let id_rutas = this.state.id_rutas;
    console.log(id_rutas);
    // url de backend
    const baseUrl = "http://localhost:3001/Shipping/shippingEdit/"+id_rutas
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
      id_origen:this.state.select_ciudad_origen,
      id_destino:this.state.select_ciudad_destino
    }

    Axios.put(baseUrl,datapost)
    .then(response=>{
      if (response.data.success===true) {
        alert(response.data.message)
      }
      else {
        alert("Error")
      }
    }).catch(error=>{
      alert("Error 34 "+error)
    })

   }



  render() {
    const {
      id_rutas,
      codigo_ruta,
      nombre_producto,
      referencia,
      cantidad,
      flete,
      fecha_inicio,
      fecha_fin,
      id_vehiculo,
      ciudad_destino,
      ciudad_origen,
      select_conduct,
      select_ciudad_destino,
      select_ciudad_origen,
      select_vehicle,
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
        <h3 className="tittle">Envios</h3>
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
                  <h3 className="title">Registar Envio</h3>

                </div>
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCodEnvio">Codigo de Envio</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.codigo_ruta}
                        onChange={(value) =>
                          this.setState({
                            codigo_envio: value.target.value,
                          })
                        }
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputValorEnvio">Valor Envio</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.flete}
                        onChange={(value) =>
                          this.setState({
                            valor_envio: value.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputNombreProducto">Nombre Producto</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.nombre_producto}
                        onChange={(value) =>
                          this.setState({
                            nombre_producto: value.target.value,
                          })
                        }
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputVehiculoAsignado">Vehiculo Asignado</label>
                      <select
                        className="form-control"
                        name="select_placa"
                        value={this.state.select_vehicle}
                        onChange={(value) =>
                          this.setState({
                            select_vehicle: value.target.value,
                          })
                        }
                      >
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
                        value={this.state.referencia}
                        onChange={(value) =>
                          this.setState({
                            referencia: value.target.value,
                          })
                        }
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCantidad">Cantidad</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.cantidad}
                        onChange={(value) =>
                          this.setState({
                            cantidad: value.target.value,
                          })
                        }
                      />
                    </div>
                  </div>



                  <div class="form-row">

                    <div class="form-group col-md-3">
                      <label for="inputState">Ciudad Origen</label>
                      <select
                        className="form-control"
                        name="select_placa"
                        value={this.state.select_ciudad_origen}
                        onChange={(value) =>
                          this.setState({
                            select_ciudad_origen: value.target.value,
                          })
                        }
                      >
                        {this.state.cityData.map((city) => (
                          <option value={city.id_ciudad}>
                            {city.descripcion}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div class="form-group col-md-3">
                      <label for="inputState">Ciudad Destino</label>
                      <select
                        className="form-control"
                        name="select_placa"
                        value={this.state.select_ciudad_destino}
                        onChange={(value) =>
                          this.setState({
                            select_ciudad_destino: value.target.value,
                          })
                        }
                      >
                        {this.state.cityData.map((city) => (
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
                        value={this.state.fecha_inicio}
                        onChange={(value) =>
                          this.setState({
                            fecha_inicio: value.target.value,
                          })
                        }
                      />
                    </div>

                    <div class="form-group col-md-3">
                      <label for="inputState">Fecha Fin</label>
                      <input
                        className="form-control"
                        type="date"
                        value={this.state.fecha_fin}
                        onChange={(value) =>
                          this.setState({
                            fecha_fin: value.target.value,
                          })
                        }
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
              <th className="th-shipping" scope="col">Codigo Envio</th>
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
            {this.state.shippingData.map((data) => (
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
                    onClick={() => this.openModalEditar(data.id_rutas)}
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
                    onClick={()=>this.onDelete(data.id_rutas)}
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
export default ShippingContent;

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import logo from '../../images/Logo_color.png';
import '../../styles/Login.css'

const cookies = new Cookies();

class Login extends Component {
    state = {
        form: {
            usuario: '',
            clave: ''
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        //console.log(this.state.form)
    }

    componentDidMount() {
        if (cookies.get('id_rol')) {
            window.location.href = "./Main";
        }
    }

    iniciarSesion = async () => {
        const baseUrl = "http://localhost:3001/User/getUser/" + this.state.form.usuario + "/" + this.state.form.clave

        await axios.get(baseUrl, { params: { usuario: this.state.form.usuario, clave: this.state.form.clave } })
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .then(response => {
                if (response.data.length > 0) {
                    let respuesta = response.data[0];
                    cookies.set('id_rol', respuesta.id_rol, { path: "/" });
                    cookies.set('descripcion', respuesta.descripcion, { path: "/" });
                    if (respuesta.id_rol == 1) {
                        alert(`Bienvenido Inicio sesion correctamente ${respuesta.id_rol}`);
                        window.location.href = "./Main";
                    } else {
                        alert(`Bienvenido Inicio sesion correctamente ${respuesta.id_rol}`);
                        window.location.href = "./Main";
                    }
                } else {
                    alert('El usuario o la contraseña no son correctos');
                }
            })
            .catch(error => {
                console.log(error);
            })

    }

    render() {
        return (

            <div className="container-login">
                <div class="capa-gradiente"></div>
                <form className="form-signin" id="form">
                    <img className="mb-4 logo" src={logo} alt=""></img>
                    <label className="sr-only">Usuario</label>
                    <input type="text" id="inputUser" name="usuario" className="form-control form-login" placeholder="Usuario" onChange={this.handleChange} required></input>
                    <label className="sr-only">Clave</label>

                    <input type="password" id="inputPassword" name="clave" className="form-control form-login" placeholder="Clave" onChange={this.handleChange} required></input>
                    <div className="checkbox mb-3"></div>


                    <button className="btn-login btn-lg btn-primary btn-block" type="submit" onClick={this.iniciarSesion}>Ingresar</button>

                </form>
            </div>
        );
    }
}

export default Login;

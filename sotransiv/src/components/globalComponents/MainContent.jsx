import React, { Component } from "react";
import { link, Link } from "react-router-dom";
import logo from "../../images/LogoWhite.png";
import user from "../../images/user.jpg";
import "../../styles/Sidebar.css";
import Navbar from '../globalComponents/Navbar';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class slide extends Component {
  
  closeSesion=()=>{
    cookies.remove('id_rol', {path: "/"})
    window.location.href="./"
  }

  componentDidMount() {
    if(!cookies.get('id_rol')){
        window.location.href="./";
    }
}
  render() { 
    
    console.log('id_rol'+ cookies.get('id_rol'));

    return (  
      <div className="form-row">
      <div id="sidebar-container position-fixed" className="bg-primary">
        <div className="content-sidebar">
        <div className="logo">
          <Link to="/Main">
            <img className="mb-4 logoWhite" src={logo} alt=""></img>
          </Link>
        </div>
        <div className="menu" id="sidebar">
          <Link to="/Vehicle" className="d-block text-light p-3 border-0">
            <i className="icon ion-md-apps lead mr-2"></i> Vehículos
          </Link>
          <Link to="/Conduct" className="d-block text-light p-3 border-0">
            <i className="icon ion-md-people lead mr-2"></i> Conductores
          </Link>
          <Link to="/Routes" className="d-block text-light p-3 border-0">
            <i className="icon ion-md-paper-plane lead mr-2"></i>Rutas
          </Link>
          {/* <Link to="/Report" className="d-block text-light p-3 border-0">
            <i className="icon ion-md-stats lead mr-2"></i> Reportes
          </Link> */}                   

          <button onClick={this.closeSesion}>Cerrar sesion</button>
          
        </div>
        </div>
          <Navbar />
          
      </div>
    </div>
    );
  }
}
 
export default slide;
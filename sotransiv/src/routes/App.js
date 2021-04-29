import React, { Component } from 'react';
import { BrowserRouter, Swith, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import MainLogin from '../pages/login/MainLogin';
import Main from '../pages/globalPages/Main';
import Shipping from '../pages/route/Shipping';
import Report from '../pages/report/Report';
import Conduct from '../pages/conduct/Conduct';
import Vehicle from '../pages/vehicle/Vehicle';
import RegisterConduct from '../pages/conduct/RegisterConduct'
import RegisterVehicle from '../pages/vehicle/RegisterVehicle';
import RegisterShipping from '../pages/route/RegisterShipping';
//import '@fortawesome/fontawesome-free/css/fontawesome.min.css'


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={MainLogin} />
      <Route path="/Main" component={Main} />
      <Route path="/Vehicle" component={Vehicle} />
      <Route path="/Shipping" component={Shipping} />
      <Route path="/Report" component={Report} />
      <Route path="/Conduct" component={Conduct} />
      <Route path="/RegisterVehicle" component={RegisterVehicle}/>
      <Route path="/RegisterConduct" component={RegisterConduct}/>
      <Route path="/RegisterShipping" component={RegisterShipping}/>
    </BrowserRouter>
  );

}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Swith, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import MainLogin from '../pages/login/MainLogin';
import Main from '../pages/globalPages/Main';
import Routes from '../pages/route/Routes';
import Report from '../pages/report/Report';
import Conduct from '../pages/conduct/Conduct';
import Vehicle from '../pages/vehicle/Vehicle';
import RegisterConduct from '../pages/conduct/RegisterConduct'
import RegisterVehicle from '../pages/vehicle/RegisterVehicle';
import RegisterRoute from '../pages/route/RegisterRoute';
//import '@fortawesome/fontawesome-free/css/fontawesome.min.css'


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={MainLogin} />
      <Route path="/Main" component={Main} />
      <Route path="/Vehicle" component={Vehicle} />
      <Route path="/Routes" component={Routes} />
      <Route path="/Report" component={Report} />
      <Route path="/Conduct" component={Conduct} />
      <Route path="/RegisterVehicle" component={RegisterVehicle}/>
      <Route path="/RegisterConduct" component={RegisterConduct}/>
      <Route path="/RegisterRoute" component={RegisterRoute}/>
    </BrowserRouter>
  );

}

export default App;

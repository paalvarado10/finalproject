import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// containers
import App from './ui/App.js';
import NuevoUsuario from './ui/NuevoUsuario.js';
import IniciarSesion from './ui/IniciarSesion.js';
import RegistrarProduccion from './ui/RegistrarProduccion.js';

export const AppRoutes = () => (
  <Router>
    <div>
      <Route exact path='/' component={App}/>
      
      <Route exact path='/nuevaproduccion' component={RegistrarProduccion}/>

      <Route exact path='/nuevousuario' component={NuevoUsuario}/>

      <Route exact path='/iniciarsesion' component={IniciarSesion}/>
    </div>
  </Router>
);
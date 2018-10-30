import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// containers
import App from './ui/App.js';
import NuevoUsuario from './ui/NuevoUsuario.js';
import IniciarSesion from './ui/IniciarSesion.js';
import RegistrarProduccion from './ui/RegistrarProduccion.js';
import AplicantesApp from './ui/AplicantesApp.js';
import ArtistasList from './ui/ArtistasList.js';
import MisAplicacionesApp from './ui/MisAplicacionesApp.js';
import ProduccionesList from './ui/ProduccionesList.js';

export const AppRoutes = () => (
  <Router>
    <div>
      <Route exact path='/' component={App}/>
      
      <Route exact path='/nuevaproduccion' component={RegistrarProduccion}/>

      <Route exact path='/nuevousuario' component={NuevoUsuario}/>

      <Route exact path='/iniciarsesion' component={IniciarSesion}/>

      <Route exact path='/artistaslist' component={ArtistasList}/>

      <Route exact path='/misaplicantes' component={AplicantesApp}/>

      <Route exact path='/misaplicaciones' component={MisAplicacionesApp}/>

      <Route exact path='/produccioneslist' component={ProduccionesList}/>
    </div>
  </Router>
);
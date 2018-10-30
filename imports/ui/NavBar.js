import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Aplicaciones } from '../api/aplicaciones.js';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };
  }

  cerrarSesion() {
    if (Meteor.user()) {
      Meteor.logout((e) => {
        if (e !== undefined) {
          console.log('ERROR: no fue posible realizar un logout:' + e);
        } 
      });
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light sticky-top">
        <a className="navbar-brand nav-link hvr-icon-grow" href="/">
          <i className="fas fa-theater-masks"></i>
          AdE
        </a>                 
       
        {this.props.currentUser ?

          <div className="row">

            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center" to="/produccioneslist">Producciones</Link>
            </div>

            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center" to="/artistaslist">Artistas</Link>
            </div> 

            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center" to="/misaplicaciones">Mis aplicaciones</Link>
              {this.props.misaplicaciones.length > 0 ?
                <span className="badge badge-primary badge-pill">{this.props.misaplicaciones.length}</span>
                : ''}
            </div>


            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center" to="/misaplicantes">Mis aplicantes</Link>
              {this.props.aplicantes.length > 0 ?
                <span className="badge badge-primary badge-pill">{this.props.aplicantes.length}</span>
                : ''}
            </div>

            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center" to="/nuevaproduccion">Agregar producción</Link>
            </div> 
            
            <div className="col nav-item navbar-tab">            
              <button type="button" className="btn btn-primary" onClick={this.cerrarSesion.bind(this)}>Cerrar sesión</button>           
            </div>
          </div>

          :
          <div className="row">
            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center" to="/produccioneslist">Producciones</Link>
            </div>             
            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center" to="/nuevousuario">Registrarse</Link>
            </div>
            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center" to="/iniciarsesion">Iniciar sesión</Link>
            </div>
          </div>
          
        }
                      
       
      </nav>
    );
  }
}

NavBar.propTypes = {
  currentUser: PropTypes.object,
  aplicantes: PropTypes.array,
  misaplicaciones: PropTypes.array  
};

export default withTracker(() => {
  Meteor.subscribe('aplicaciones');
  return {
    aplicantes: Aplicaciones.find({ $and: [ {idPublicador:Meteor.userId()}, {leida:false} ] }).fetch(),
    misaplicaciones:Aplicaciones.find({ $and: [ {idAplicante:Meteor.userId()}, {leida:false} ] }).fetch(),
    currentUser: Meteor.user()
  };
})(NavBar);

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
      <nav className="navbar navbar-light bg-light sticky-top" id="minavbar">
        <a className="navbar-brand nav-link hvr-icon-grow linksnavbar" href="/">
          <i className="fas fa-theater-masks linksnavbar"></i>
          AdE
        </a>                 
       
        {this.props.currentUser ?

          <div className="row" id="linksnavbar">

            <div className="col nav-item navbar-tab ">            
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/produccioneslist">Producciones</Link>
              <i className="fas fa-palette iconos"></i>
            </div>

            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/artistaslist">Artistas</Link>
              <i className="fab fa-pied-piper-hat iconos"></i>
            </div> 

            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/misaplicaciones">
                 Aplicaciones</Link>
              <i className="fas fa-hand-pointer iconos">
                {this.props.misaplicaciones.length > 0 ?
                  <span className="badge badge-primary badge-pill">{this.props.misaplicaciones.length}</span>
                  : ''}</i>
              
            </div>


            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/misaplicantes">Aplicantes</Link>
              <i className="fas fa-pen-fancy iconos">{this.props.aplicantes.length > 0 ?
                <span className="badge badge-primary badge-pill">{this.props.aplicantes.length}</span>
                : ''}
              </i>
            </div>

            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/nuevaproduccion">Agregar producción</Link>
            </div> 
            
            <div className="col nav-item navbar-tab">            
              <button type="button" className="btn btn-primary" onClick={this.cerrarSesion.bind(this)}>Cerrar sesión</button>           
            </div>
          </div>

          :
          <div className="row">            
            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/produccioneslist">Producciones</Link>
              <i className="fas fa-palette iconos"></i>
            </div>             
            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/nuevousuario">Registrarse</Link>
              <i className="fas fa-user-plus iconos"></i>
            </div>
            <div className="col nav-item navbar-tab">            
              <Link className="nav-link hvr-underline-from-center linksnavbar" to="/iniciarsesion">Iniciar</Link>
              <i className="fas fa-sign-in-alt iconos"></i>
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

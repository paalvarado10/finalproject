import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };
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
              <Link className="nav-link hvr-underline-from-center" to="/nuevaproduccion">Agregar producción</Link>
            </div> 
            
            <div className="col nav-item navbar-tab">            
              <button type="button" className="btn btn-primary" onClick={this.props.cerrarSesion}>Cerrar sesión</button>           
            </div>

          </div>

          :
          <div className="row"> 
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
  cerrarSesion: PropTypes.func
  
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(NavBar);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
//import { Aplicaciones } from '../api/aplicaciones.js';

class ProduccionDetail extends Component 
{

  constructor(props) {
    super(props);

    this.state = {
      error:'',
      aplicaciones:[],
      aplicacionNoRealizada:false
    };

    this.handleAplicar = this.handleAplicar.bind(this);
  }

  handleAplicar(rol)
  {
    console.log('Nueva aplicacion en proceso user:', Meteor.userId());
    console.log('Nueva aplicacion en proceso prodId:', this.props.produccion._id);
    console.log('Nueva aplicacion en proceso prodNombre:',this.props.produccion.nombre);
    console.log('Nueva aplicacion en proceso rol:', rol);

    Meteor.call('aplicaciones.insert', this.props.produccion.usuario, this.props.produccion._id, this.props.produccion.nombre, rol, (error, result) => {

      if(error)
      {
        console.log('Error al registrar la aplicación: ', error.reason);        
        this.setState({
          error:'No fue posible enviar la solicitud: ' + error.reason                  
        });
      }
      else {
        var aplicaciones = this.state.aplicaciones;
        aplicaciones.push(rol.key);
        this.setState({
          error:'',
          aplicaciones:aplicaciones,
          aplicacionNoRealizada:true
        });
      }

    }); 
  }

  renderRoles( )
  {
    const roles = this.props.produccion.roles;

    return roles.map((rol)=>{
      return (
        <li key={rol.key} className="list-group-item d-flex justify-content-between align-items-center">
          {rol.rol}

          <span className="badge badge-primary badge-pill">Cantidad requerida: {rol.cantArtistas}</span>
          {Meteor.userId() == null || this.state.aplicacionNoRealizada? '' : <button type="button" className="btn btn-primary" onClick={()=>this.handleAplicar(rol)}>Aplicar</button>} 
        </li>
      );

    });
  }

  verificarAplicacion(rol)
  {
    for(const aplicacion in this.state.aplicaciones)
    {
      console.log('verificando aplicacion guardada ', aplicacion);
      console.log('verificando rol ', rol.key);
      if(parseInt(aplicacion,10) === rol.key)
      {
        return true;
      }
      return false;
    }
  }

  renderError( )
  {
    if(this.state.error !== '')
    {
      return(
        <div className="alert">      
          {this.state.error}
        </div>
      );   
    }
  }

  render() {
    return (
      <div>
        {this.renderError()}
        <div className="row pb-sm-4">        
          <div className="col-md-4">
            <div className="card">        
              <div className="card-body">
                <h6 className="card-title">{this.props.produccion.nombre}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Tipo: {this.props.produccion.tipo}</h6>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">¿Cuándo? El {this.props.produccion.fecha} a las {this.props.produccion.hora}</li>
                <li className="list-group-item">¿Dónde? {this.props.produccion.lugar}</li>
                <li className="list-group-item">Agrupación/compañia: {this.props.produccion.grupo}</li>
              </ul>            
            </div>
          </div>
          <div className ="col-md-7">
            <div className="card">        
              <div className="card-body">
                <h6 className="card-title"> Genero: {this.props.produccion.genero}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Duracion: {this.props.produccion.duracion} minutos</h6>
                <p className="card-text">Descripcion: {this.props.produccion.descripcion}</p>
                <p className="card-text">Roles</p>
              </div>            
              <ul className="list-group">
                {this.renderRoles()}
              </ul>
            </div>
          </div>
          <div className = "col-md-1">
            <button type="button" className="btn btn-primary" onClick={this.props.handleCerrarDetail}>X</button>
          </div>
        </div> 
      </div> 
    );
    
  }
}

ProduccionDetail.propTypes = {
  currentUser: PropTypes.object,
  produccion: PropTypes.object.isRequired,
  handleCerrarDetail: PropTypes.func.isRequired
};

export default ProduccionDetail;
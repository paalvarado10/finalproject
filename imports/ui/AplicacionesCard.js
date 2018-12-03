import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';


export default class AplicacionesCard extends Component {

  constructor(props) {
    super(props);
    this.removerAplicacion = this.removerAplicacion.bind(this);
    this.marcarComoLeida = this.marcarComoLeida.bind(this);
    this.marcarComoNoLeida = this.marcarComoNoLeida.bind(this);
  }

  removerAplicacion() {
    Meteor.call('aplicaciones.remover', this.props.aplicacion._id);
  }

  marcarComoLeida( )
  {
    Meteor.call('aplicaciones.marcarcomoleida', this.props.aplicacion._id);
  }

  marcarComoNoLeida( )
  {
    Meteor.call('aplicaciones.marcarcomonoleida', this.props.aplicacion._id);
  }

  renderAceptado( )
  {
    if(this.props.aplicacion.idAplicante == this.props.currentUser)
    {
      if(this.props.aplicacion.aceptada)
      {
        return(
          <div>
            <span className="badge badge-primary badge-pill">Aceptada</span>  
            <br/>
          </div>        
        );

      }
      if(this.props.aplicacion.rechazada)
      {
        return(
          <div>
            <span className="badge badge-primary badge-pill">Rechazada</span> 
            
          </div>        
        );
      } 
      return(
        <div>
          <span className="badge badge-primary badge-pill">En espera</span> 
          
        </div>        
      );
    }
  }

  render() {
    return (
      <div className="card">            
        <ul className="list-group list-group-flush">        
          <li className="list-group-item"><strong>Estado solicitud: </strong> {this.renderAceptado()}</li> 
          <li className="list-group-item"><strong>Nombre: </strong> {this.props.produccion.nombre}</li>          
          <li className="list-group-item"><strong>Rol aplicado: </strong> {this.props.aplicacion.rol.rol}</li>
          <li className="list-group-item"><strong>Descripción: </strong> {this.props.produccion.descripcion}</li>
          <li className="list-group-item"><strong>Fecha: </strong>{this.props.produccion.fecha}</li>
          <li className="list-group-item"><strong>Hora: </strong>{this.props.produccion.hora}</li>
          <li className="list-group-item"><strong>Lugar: </strong>{this.props.produccion.lugar}</li>
          <li className="list-group-item"><strong>Tipo: </strong>{this.props.produccion.tipo}</li>
          <li className="list-group-item"><strong>Genero: </strong>{this.props.produccion.genero}</li>
          <li className="list-group-item"><strong>Duración: </strong>{this.props.produccion.duracion}</li>
        </ul>

        {/*boton para borrar la aplicacion*/}
        {this.props.aplicacion.idAplicante = this.props.currentUser ?
          <div className="card-body">
            <a href="#" className="btn btn-danger" onClick={this.removerAplicacion}>Borrar aplicacion</a>
            {this.props.aplicacion.leidaAplicante === false ? 
              <a href="#" className="btn btn-danger" onClick={this.marcarComoLeida}>Marcar como leída</a>
              :
              <a href="#" className="btn btn-danger" onClick={this.marcarComoNoLeida}>Dejar no leída</a>
            }
          </div> : ''}
      </div>
    );
  }
}

AplicacionesCard.propTypes = {
  produccion: PropTypes.object.isRequired,
  aplicacion: PropTypes.object.isRequired,
  currentUser:PropTypes.string.isRequired
};
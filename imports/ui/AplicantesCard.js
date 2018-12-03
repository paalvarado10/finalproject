import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

export default class AplicantesCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };

    this.removerAplicacion = this.removerAplicacion.bind(this);
    this.aceptarAplicacion = this.aceptarAplicacion.bind(this);
    this.rechazarAplicacion = this.rechazarAplicacion.bind(this);
    this.marcarComoLeida = this.marcarComoLeida.bind(this);
    this.marcarComoNoLeida = this.marcarComoNoLeida.bind(this);
    this.handleMasInformacionArtista = this.handleMasInformacionArtista.bind(this);
  }

  aceptarAplicacion() {
    Meteor.call('aplicaciones.aceptar', this.props.aplicacion._id);
  }

  rechazarAplicacion() {
    Meteor.call('aplicaciones.rechazar', this.props.aplicacion._id);
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

  handleMasInformacionArtista()
  {
    return this.props.handleSeleccionDetail(this.props.aplicacion.idAplicante);
  }   

  renderBotones( )
  {
    if(this.props.aplicacion.idPublicador == this.props.currentUser)
    {
      if(this.props.aplicacion.aceptada)
      {
        return(<div className="card-body">
          <span className="badge badge-primary badge-pill">Aceptada</span>          
        </div>);

      }
      if(this.props.aplicacion.rechazada)
      {
        return(<div className="card-body">
          <span className="badge badge-primary badge-pill">Rechazada</span>          
        </div>);
      } 

      return(
        <div className="card-body">
          <a href="#" className="btn btn-danger pr-sm-3" onClick={this.aceptarAplicacion}>Aceptar</a>
          <a href="#" className="btn btn-danger" onClick={this.rechazarAplicacion}>Rechazar</a>
        </div>
      );

    }
  }

  render() {
    return (
      <div className="card">        
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Nombre Producción: </strong> {this.props.produccion.nombre}</li>
          <li className="list-group-item"><strong>Descripción: </strong> {this.props.produccion.descripcion}</li>
          <li className="list-group-item"><strong>Nombre Aplicante: </strong>{this.props.aplicacion.usernameAplicante}</li>          
          <li className="list-group-item"><strong>Rol aplicado: </strong>{this.props.aplicacion.rol.rol}</li>
        </ul>

        {this.renderBotones()}        

        {this.props.aplicacion.idPublicador = this.props.currentUser ?
          <div className="card-body">
              
            {this.props.aplicacion.leidaPublicador === false ? 
              <a href="#" className="btn btn-danger" onClick={this.marcarComoLeida}>Marcar como leída</a>
              :
              <a href="#" className="btn btn-danger" onClick={this.marcarComoNoLeida}>Dejar no leída</a>}
          </div> : ''}
      </div>
    );
  }
}

AplicantesCard.propTypes = {
  produccion: PropTypes.object.isRequired,
  aplicacion: PropTypes.object.isRequired,
  usuario:PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  handleSeleccionDetail:PropTypes.func
};
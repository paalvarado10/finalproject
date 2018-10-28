import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Produccion extends Component 
{

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title">{this.props.produccion.nombre}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Fecha: {this.props.produccion.fecha} Hora: {this.props.produccion.hora} </h6>
          <p className="card-text">{this.props.produccion.descripcion}</p>
        </div>
      </div>      
    );
    
  }
}

Produccion.propTypes = {
  produccion: PropTypes.object.isRequired,
  usuario: PropTypes.object.isRequired
};

export default Produccion;
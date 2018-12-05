import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ItemProduccion extends Component 
{

  constructor(props) {
    super(props);

    this.state = {
    };


    this.handleMasInformacion = this.handleMasInformacion.bind(this);
  }

  handleMasInformacion()
  {
    return this.props.handleSeleccionDetail(this.props.produccion._id, this.props.rowNumber);
  }    

  render() {
    return (
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
        <div className="card-body">
          <button type="button" className="btn btn-primary" onClick={this.handleMasInformacion}>Más información</button>           
        </div>
      </div>  
    );
    
  }
}

ItemProduccion.propTypes = {
  produccion: PropTypes.object.isRequired,
  usuario: PropTypes.object,
  handleSeleccionDetail:PropTypes.func.isRequired,
  rowNumber: PropTypes.number
};

export default ItemProduccion;
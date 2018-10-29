import React, {Component} from 'react';
import PropTypes from 'prop-types';


class ProduccionDetail extends Component 
{

  constructor(props) {
    super(props);

    this.state = {
    };

  }

  renderRoles( )
  {
    const roles = this.props.produccion.roles;

    return roles.map((rol)=>{
      return (
        <li key={rol.key} className="list-group-item d-flex justify-content-between align-items-center">
          {rol.rol}
          <span className="badge badge-primary badge-pill">{rol.cantArtistas}</span>
        </li>
      );

    });
  }

  render() {
    return (
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
    );
    
  }
}

ProduccionDetail.propTypes = {
  usuario: PropTypes.object,
  produccion: PropTypes.object.isRequired,
  handleCerrarDetail: PropTypes.func.isRequired
};

export default ProduccionDetail;
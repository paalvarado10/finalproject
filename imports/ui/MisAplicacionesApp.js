import React, { Component } from 'react';
import { Aplicaciones } from '../api/aplicaciones.js';
import { Producciones } from '../api/producciones.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AplicacionesCard from './AplicacionesCard.js';
import NavBar from './NavBar.js';

//la pagina principal de mensaje
class MisAplicacionesApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.renderAplicaciones = this.renderAplicaciones.bind(this);
  }


  renderAplicaciones() {
    let filteredAplicaciones = this.props.aplicaciones;
    let idUser = this.props.currentUser && this.props.currentUser._id;
    console.log('idUser', idUser);

    //se filtran las aplicaciones a las que el id aplicante sea igual al mio
    filteredAplicaciones = filteredAplicaciones.filter(aplicacion => aplicacion.idAplicante == idUser);

    return filteredAplicaciones.map((aplicacion) => {
   
      console.log('aplicacion', aplicacion);
      //se busca la produccion en el prop de producciones que su idProduccion sea igual al de la aplicacion actual
      console.log('produccion', Producciones.findOne({_id:aplicacion.idProduccion}));
      return (        
        <AplicacionesCard
          key={aplicacion._id}
          produccion={Producciones.findOne({_id:aplicacion.idProduccion})}
          aplicacion={aplicacion}
          currentUser={Meteor.userId()}
        />
        
      );
    });
  }

  render() {
    return (
      <div>
        <NavBar />             
        <div className="container pt-sm-3">          
          <div className="card-deck">
            {this.renderAplicaciones()}
          </div>
        </div>
      </div>
    );
  }
}

MisAplicacionesApp.propTypes = {
  aplicaciones: PropTypes.array.isRequired,
  producciones: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};

export default withTracker(() => {
  //se suscribe a la coleccion aplicaciones y producciones
  Meteor.subscribe('aplicaciones');
  Meteor.subscribe('producciones');

  //se ordena del ultimo creado al mas viejo
  return {
    aplicaciones: Aplicaciones.find({}, { sort: { createdAt: -1 } }).fetch(),
    producciones: Producciones.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
})(MisAplicacionesApp);
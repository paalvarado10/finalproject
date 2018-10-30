import React, { Component } from 'react';
import { Aplicaciones } from '../api/aplicaciones.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AplicantesCard from './AplicantesCard.js';
import { Producciones } from '../api/producciones.js';
import NavBar from './NavBar.js';

class AplicantesApp extends Component {

  constructor(props) {
    super(props);


    this.state = {
      redirect: false
    };
    this.renderAplicantes = this.renderAplicantes.bind(this);
  }

  renderAplicantes() {
    let filteredAplicaciones = this.props.aplicaciones;
    let idUser = this.props.currentUser && this.props.currentUser._id;

    //se filtran las aplicaciones a las que el id publicador sea igual al mio
    filteredAplicaciones = filteredAplicaciones.filter(aplicacion => aplicacion.idPublicador == idUser);

    return filteredAplicaciones.map((aplicacion) => {
             
      //busco al usuario de esta aplicacion
      let usuario = Meteor.users.findOne(aplicacion.idPublicador);
        
      return (
        <AplicantesCard
          key={aplicacion._id}
          usuario={usuario}
          aplicacion={aplicacion}
          currentUser={this.props.currentUser && this.props.currentUser._id}
          produccion={Producciones.findOne({_id:aplicacion.idProduccion})}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container pt-sm-3">        
          {/*aplicaciones reenderizadas*/}
          <div className="card-deck">
            {this.renderAplicantes()}
          </div>
        </div>
      </div>
    );
  }
}

AplicantesApp.propTypes = {
  aplicaciones: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};

export default withTracker(() => {
  //se suscribe a la coleccion aplicaciones y producciones
  Meteor.subscribe('aplicaciones');
  Meteor.subscribe('producciones');

  //se ordena del ultimo creado al mas viejo
  return {
    aplicaciones: Aplicaciones.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
})(AplicantesApp);
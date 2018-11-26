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
      mostrar:false
    };
    this.renderAplicaciones = this.renderAplicaciones.bind(this);
    this.cambiarMostrar = this.cambiarMostrar.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  cambiarMostrar()
  {
    if(this.state.mostrar == false)
    {
      this.setState({mostrar:true});
    }
  }

  componentDidUpdate()
  {
    if(Producciones.find({}).fetch().length !== 0)
    {
        this.cambiarMostrar();
    }
  }
  renderAplicaciones() {
    let filteredAplicaciones = this.props.aplicaciones;
    let idUser = this.props.currentUser && this.props.currentUser._id;
    console.log('idUser', idUser);

    //se filtran las aplicaciones a las que el id aplicante sea igual al mio
    filteredAplicaciones = Aplicaciones.find({idAplicante:Meteor.userId()}).fetch();

    return filteredAplicaciones.map((aplicacion) => {
      console.log('aplicacion', aplicacion.idProduccion);
      //se busca la produccion en el prop de producciones que su idProduccion sea igual al de la aplicacion actual
      console.log('produccion', Producciones.find({}).fetch());

      return (
        <div key = {aplicacion._id} className = "col-md-4">        
        <AplicacionesCard
          key={aplicacion._id}
          produccion={Producciones.findOne({_id:aplicacion.idProduccion})}
          aplicacion={aplicacion}
          currentUser={Meteor.userId()}
        />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <NavBar />             
        <div className="container pt-sm-3">          
          <div className="card-deck">
            {this.state.mostrar?this.renderAplicaciones():''}
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
  Meteor.subscribe('producciones').ready();
  Meteor.subscribe('aplicaciones').ready();


  //se ordena del ultimo creado al mas viejo
  return {
    producciones: Producciones.find({}, { sort: { createdAt: -1 } }).fetch(),
    aplicaciones: Aplicaciones.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
})(MisAplicacionesApp);
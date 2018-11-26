import React, { Component } from 'react';
import { Aplicaciones } from '../api/aplicaciones.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AplicantesCard from './AplicantesCard.js';
import { Producciones } from '../api/producciones.js';
import NavBar from './NavBar.js';
import ArtistaDetail from './ArtistaDetail.js';

class AplicantesApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mostrarDetail:undefined,
      mostrar:false
    };

    this.renderAplicantes = this.renderAplicantes.bind(this);
    this.handleSeleccionDetail = this.handleSeleccionDetail.bind(this);
    this.handleCerrarDetail = this.handleCerrarDetail.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.cambiarMostrar = this.cambiarMostrar.bind(this);
  }

  componentDidUpdate()
  {
    console.log("update 1")
    if(Producciones.find({}).fetch().length !== 0)
    {
      console.log("update 2")

        this.cambiarMostrar();
    }
  }

  cambiarMostrar()
  {
    if(this.state.mostrar == false)
    {
      this.setState({mostrar:true});
      console.log(this.state.mostrar);
      console.log("hue");
    }
  }

  renderAplicantes() {
    let filteredAplicaciones = this.props.aplicaciones;

    //se filtran las aplicaciones a las que el id publicador sea igual al mio
    filteredAplicaciones = Aplicaciones.find({idPublicador:Meteor.userId()}).fetch();

    return filteredAplicaciones.map((aplicacion) => {
             
      //busco al usuario de esta aplicacion
      let usuario = Meteor.users.findOne(aplicacion.idPublicador);
        
      return (
      <div key={aplicacion._id} className = "col-md-4">
        <AplicantesCard
          key={aplicacion._id}
          usuario={usuario}
          aplicacion={aplicacion}
          currentUser={this.props.currentUser && this.props.currentUser._id}
          produccion={Producciones.findOne({_id:aplicacion.idProduccion})}
          handleSeleccionDetail={this.handleSeleccionDetail}
        />
        </div>
      );
    });
  }


  handleSeleccionDetail(artistaId)
  {
    console.log('Selecciono el artista con id: ', artistaId);
    this.setState({
      mostrarDetail:artistaId      
    });
  }

  handleCerrarDetail()
  {
    this.setState({
      mostrarDetail:undefined      
    });
  }

  renderDetailArtista()
  {
    if(this.state.mostrarDetail)
    {

      return (<ArtistaDetail 
        artista={Meteor.users.findOne({_id:this.state.mostrarDetail})}
        handleCerrarDetail={this.handleCerrarDetail}/>        
      );
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="container pt-sm-3">                  
          {/*aplicaciones reenderizadas*/}
          <div className="card-deck">
            {this.state.mostrar?this.renderAplicantes():''}
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
  Meteor.subscribe('producciones').ready();
  Meteor.subscribe('aplicaciones').ready();

  //se ordena del ultimo creado al mas viejo
  return {
    producciones: Producciones.find({}, { sort: { createdAt: -1 } }).fetch(), 
    aplicaciones: Aplicaciones.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
})(AplicantesApp);
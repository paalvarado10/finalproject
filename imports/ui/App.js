import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Producciones } from '../api/producciones.js';

import NavBar from './NavBar.js';
import Produccion from './Produccion.js';
import PropTypes from 'prop-types';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  cerrarSesion() {
    if (Meteor.user()) {
      Meteor.logout((e) => {
        if (e !== undefined) {
          console.log('ERROR: no fue posible realizar un logout:' + e);
        } 
      });
    }
  }

  renderProducciones( )
  {
    return this.props.producciones.map((produc)=>{
      return <Produccion key={produc._id} produccion={produc} />;
    });
  }

  render() {
    return (
      <div>
        <NavBar 
          cerrarSesion={this.cerrarSesion.bind(this)}/>
        <div className="container">
          {this.renderProducciones()}          
        </div>
          
      </div>
    );
  }  

}

App.propTypes = {
  producciones: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired
};


export default withTracker(() => {

  Meteor.subscribe('producciones');
  
  return {
    producciones: Producciones.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(App);



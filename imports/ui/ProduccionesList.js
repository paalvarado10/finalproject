import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Producciones } from '../api/producciones.js';

import ItemProduccion from './ItemProduccion.js';
import ProduccionDetail from './ProduccionDetail.js';
import PropTypes from 'prop-types';
import NavBar from './NavBar.js';


class ProduccionesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mostrarDetail:undefined
    };


    this.handleSeleccionDetail = this.handleSeleccionDetail.bind(this);
    this.handleCerrarDetail = this.handleCerrarDetail.bind(this);
  }

  renderProducciones( )
  {
    return this.props.producciones.map((produc)=>{

      if(this.state.mostrarDetail)
      {
        if(this.state.mostrarDetail === produc._id)
        {
          return <div key={produc._id}></div>;
        }
      }
      
      return (        
        <div key={produc._id} className="col-md-3">
          <ItemProduccion produccion={produc} handleSeleccionDetail={this.handleSeleccionDetail}/>
        </div>
      );      
      
    });
  }

  handleSeleccionDetail(produccionId)
  {
    console.log('Selecciono la produccion con id: ', produccionId);
    this.setState({
      mostrarDetail:produccionId      
    });
  }

  handleCerrarDetail()
  {
    this.setState({
      mostrarDetail:undefined      
    });
  }

  renderDetail()
  {
    if(this.state.mostrarDetail)
    {

      return (<ProduccionDetail 
        produccion={Producciones.findOne({_id:this.state.mostrarDetail})}
        handleCerrarDetail={this.handleCerrarDetail}/>        
      );
    }
  }

  render() {
    return (
      <div>  
        <NavBar />      
        <div className="container pt-sm-3">
          {this.renderDetail()}
          <div className="row">
            {this.renderProducciones()}  
          </div>        
        </div>
          
      </div>
    );
  }  

}

ProduccionesList.propTypes = {
  producciones: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};


export default withTracker(() => {

  Meteor.subscribe('producciones');
  
  return {
    producciones: Producciones.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(ProduccionesList);



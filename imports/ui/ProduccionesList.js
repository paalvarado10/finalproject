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
      mostrarDetail:undefined,
      rowNumberDetail:1
    };


    this.handleSeleccionDetail = this.handleSeleccionDetail.bind(this);
    this.handleCerrarDetail = this.handleCerrarDetail.bind(this);
  }

  renderProducciones( )
  {
    var prodTemp = undefined;
    return this.props.producciones.map((produc,i)=>{

      const nRow = Math.ceil((i+1)/4);

      if(this.state.mostrarDetail && this.state.rowNumberDetail === nRow)
      {
        if((i+1)%4 === 1)
        {
          prodTemp = produc;
          return (
            <div key={produc._id} className = "col-md-12">
              <ProduccionDetail 
                produccion={Producciones.findOne({_id:this.state.mostrarDetail})}
                handleCerrarDetail={this.handleCerrarDetail}/>
            </div>
          );

        }

        if(this.state.mostrarDetail === produc._id)
        {
          return (
            <div key={prodTemp._id} className="col-md-3">
              <ItemProduccion 
                produccion={prodTemp} 
                handleSeleccionDetail={this.handleSeleccionDetail}
                rowNumber={nRow}/>
            </div>
          );

        }
      }
      
      return (        
        <div key={produc._id} className="col-md-3">
          <ItemProduccion 
            produccion={produc} 
            handleSeleccionDetail={this.handleSeleccionDetail}
            rowNumber={nRow}/>
        </div>
      );      
      
    });
  }

  handleSeleccionDetail(produccionId, rowNumber)
  {
    console.log('Selecciono la produccion con id: ', produccionId);
    this.setState({
      mostrarDetail:produccionId,
      rowNumberDetail:rowNumber      
    });
  }

  handleCerrarDetail()
  {
    this.setState({
      mostrarDetail:undefined,
      rowNumberDetail:1      
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



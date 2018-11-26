import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ItemArtista from './ItemArtista.js';
import ArtistaDetail from './ArtistaDetail.js';
import PropTypes from 'prop-types';
import NavBar from './NavBar.js';
import { Artistas } from '../api/artistas.js';


class ArtistasList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mostrarDetail:undefined
    };


    this.handleSeleccionDetail = this.handleSeleccionDetail.bind(this);
    this.handleCerrarDetail = this.handleCerrarDetail.bind(this);
  }

  renderArtistas( )
  {
    return this.props.usuarios.map((usuario)=>{

      if(this.state.mostrarDetail)
      {
        if(this.state.mostrarDetail === usuario._id)
        {
          return <div key={usuario._id}></div>;
        }
      }      
       
      return (
        <div key={usuario._id}>
          <ItemArtista artista={usuario} handleSeleccionDetail={this.handleSeleccionDetail}/>
        </div>);
    });
  }

  handleSeleccionDetail(artistaId)
  {
    console.log('Selecciono el produccion con id: ', artistaId);
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

  renderDetail()
  {
    if(this.state.mostrarDetail)
    {

      return (<ArtistaDetail 
        artista={Artistas.findOne({_id:this.state.mostrarDetail})}
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
          <div className="card-deck">
            {this.renderArtistas()}  
          </div>        
        </div>
          
      </div>
    );
  }  

}

ArtistasList.propTypes = {
  usuarios: PropTypes.array.isRequired
};


export default withTracker(() => {

  Meteor.subscribe('artistas');
  return {
    usuarios: Artistas.find({}).fetch()
  };
})(ArtistasList);



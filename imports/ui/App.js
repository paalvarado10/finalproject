import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Producciones } from '../api/producciones.js';


// App component - represents the whole app

class App extends Component {

    render() {
    return (
      <div className="container">
        <header>
          <h1>El arte de encontrarnos</h1>
        </header>
      </div>
    );
  }  

}

export default withTracker(() => {
  return {
    producciones: Producciones.find({}).fetch()
  };
})(App);



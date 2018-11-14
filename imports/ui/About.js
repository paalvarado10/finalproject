import React, { Component } from 'react';

import NavBar from './NavBar.js';


class About extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>        
        <NavBar/>
         <header className="masthead">
           <div className="container">
             <div className="intro-text">
               <div className="intro-lead-in">!Bienvenido al arte de encontrarnos!</div>
               <div className="intro-heading text-uppercase">¡Es un gusto conocerte!</div>
             </div>
           </div>
       </header>           
      </div>
    );
  }  

}

export default About;



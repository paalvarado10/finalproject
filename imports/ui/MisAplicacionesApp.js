import React, { Component } from 'react';
import { Aplicaciones } from '../api/aplicaciones.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import PropTypes from 'prop-types';
import AplicacionesCard from './AplicacionesCard.js';
//la pagina principal de mensaje
class MisAplicacionesApp extends Component {

    constructor(props) {
        super(props);
        this.setRedirect = this.setRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.renderAplicaciones = this.renderAplicaciones.bind(this);
    }

    setRedirect() {
        this.setState({
            redirect: true
        });
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/'
            }} />;
        }
    }

    renderAplicaciones() {
        let filteredAplicaciones = this.props.aplicaciones;
        let idUser = this.props.currentUser && this.props.currentUser._id;

        //se filtran las aplicaciones a las que el id aplicante sea igual al mio
        filteredAplicaciones = filteredAplicaciones.filter(aplicacion => aplicacion.idAplicante == idUser);

        return filteredAplicaciones.map((aplicacion) => {
       
        //se busca la produccion en el prop de producciones que su idProduccion sea igual al de la aplicacion actual

        let produccion = this.props.producciones.find(function(element) {
            return element.idProduccion == aplicacion.idProduccion;
          });
          
          return (
                <AplicacionesCard
                    key={aplicacion._id}
                    produccion={produccion}
                    aplicacion={aplicacion}
                    currentUser={this.props.currentUser && this.props.currentUser._id}
                />
            );
        });
    }

    render() {
        return (
            <div>
                {/*navvar*/}
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <h3 className="navbar-brand">NOMBRE</h3>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <AccountsUIWrapper />
                        </li>
                    </ul>
                </nav>

                <div className="container">
                    {this.renderRedirect()}
                    <button className="btn btn-primary inicio btn-lg" onClick={this.setRedirect}>Devolverse</button>
                </div>

                {/*aplicaciones reenderizadas*/}
                <ul>
                    {this.renderAplicaciones()}
                </ul>

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
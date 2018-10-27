import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export class AplicacionesCard extends Component {

    constructor(props) {
        super(props);
        this.removerAplicacion = this.removerAplicacion.bind(this);
    }

    removerAplicacion() {
        Meteor.call('aplicaciones.remover', this.props.aplicacion._id);
    }

    render() {
        return (
            <div className="card itemCard col-sm-5">
                {/* Se hace dependiendo de la estructura de una produccion */}
                <div className="card-body">
                    <h3 className="card-title">Aplicacion</h3>
                </div>
                <ul className="list-group list-group-flush">
                    
                    {/*aqui va toda la informacion*/}

                </ul>


                {/*boton para borrar la aplicacion*/}
                {this.props.aplicacion.idAplicante = this.props.currentUser ?
                    <div className="card-body">
                        <a href="#" className="btn btn-danger" onClick={this.removerAplicacion}>Borrar aplicacion</a>
                    </div> : ''}
            </div>
        );
    }
}
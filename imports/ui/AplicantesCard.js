import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export class AplicantesCard extends Component {

    constructor(props) {
        super(props);
        this.removerAplicacion = this.removerAplicacion.bind(this);
        this.aceptarAplicacion = this.aceptarAplicacion.bind(this);
    }

    aceptarAplicacion() {
        Meteor.call('aplicaciones.aceptar', this.props.aplicacion._id);
    }

    removerAplicacion() {
        Meteor.call('aplicaciones.remover', this.props.aplicacion._id);
    }

    render() {
        return (
            <div className="card itemCard col-sm-5">
                <div className="card-body">
                    <h3 className="card-title">Aplicante</h3>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Nombre Producción: </strong> {this.props.produccion.nombre}</li>
                    <li className="list-group-item"><strong>Descripción: </strong> {this.props.produccion.descripcion}</li>
                    <li className="list-group-item"><strong>Nombre Aplicante: </strong> {this.props.usuario.username}</li>
                </ul>
                {/*boton para aceptar una aplicacion*/}
                {this.props.aplicacion.idPublicador = this.props.currentUser ?
                    <div className="card-body">
                        <a href="#" className="btn btn-danger" onClick={this.aceptarAplicacion}>Aceptar aplicacion</a>
                    </div> : ''}
                {/*boton para borrar la aplicacion*/}
                {this.props.aplicacion.idPublicador = this.props.currentUser ?
                    <div className="card-body">
                        <a href="#" className="btn btn-danger" onClick={this.removerAplicacion}>Borrar aplicacion</a>
                    </div> : ''}
            </div>
        );
    }
}
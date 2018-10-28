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
                    <h3 className="card-title">Aplicación de producción</h3>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Nombre: </strong> {this.props.produccion.nombre}</li>
                    <li className="list-group-item"><strong>Descripción: </strong> {this.props.produccion.descripcion}</li>
                    <li className="list-group-item"><strong>Fecha: </strong>{this.props.produccion.fecha}</li>
                    <li className="list-group-item"><strong>Hora: </strong>{this.props.produccion.hora}</li>
                    <li className="list-group-item"><strong>Lugar: </strong>{this.props.produccion.lugar}</li>
                    <li className="list-group-item"><strong>Tipo: </strong>{this.props.produccion.tipo}</li>
                    <li className="list-group-item"><strong>Genero: </strong>{this.props.produccion.genero}</li>
                    <li className="list-group-item"><strong>Duración: </strong>{this.props.produccion.duracion}</li>
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
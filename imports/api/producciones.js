import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Producciones = new Mongo.Collection('producciones');

if (Meteor.isServer) {
  // Se publica la coleccion de producciones
  Meteor.publish('producciones', function produccionesPublication() {
    return Producciones.find();
  });
}

Meteor.methods({

  //se inserta una nueva produccion. 
  'producciones.insert'(produccion) {

    check(produccion.nombre, String);
    check(produccion.tipo, String);
    check(produccion.lugar, String);
    check(produccion.genero, String);
    check(produccion.grupo, String);
    check(produccion.descripcion, String);    
    check(produccion.duracion, Number);
    
    Producciones.insert(produccion);
  }
});
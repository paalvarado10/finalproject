import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Artistas = new Mongo.Collection('artistas');

if (Meteor.isServer) {
  // Se publica la coleccion de companies
  Meteor.publish('artistas', function artistasPublication() {
    return Artistas.find();
  });
}

Meteor.methods({

  //se inserta una nueva produccion. 
  'artistas.insert'(idArtista, profile) {

    check(idArtista, String);

    Artistas.insert({
      idArtista,
      profile      
    });
  }
});
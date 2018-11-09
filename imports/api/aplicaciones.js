import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Aplicaciones = new Mongo.Collection('aplicaciones');

if (Meteor.isServer) {
  // Se suscribe a la coleccion de aplicaciones
  Meteor.publish('aplicaciones', function aplicacionesPublication() {
    return Aplicaciones.find();
  });
}

Meteor.methods({
  //se inserta una aplicacion
  'aplicaciones.insert'(idPublicador, idProduccion, nombreProduccion, rol) {
    check(idPublicador, String);
    check(idProduccion, String);

    // El usuario debe estar loggineado
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Aplicaciones.insert({
      idPublicador,
      idProduccion,
      nombreProduccion,
      rol,
      aceptada: false,
      rechazada:false,
      leida:false,
      createdAt: new Date(),
      idAplicante: this.userId,
      usernameAplicante: Meteor.users.findOne(this.userId).username
    });
  },

  //se remueve una aplicacion
  'aplicaciones.remover'(aplicacionId) {
    check(aplicacionId, String);

    const aplicacion = Aplicaciones.findOne(aplicacionId);
    if (aplicacion.idAplicante !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Aplicaciones.remove(aplicacionId);
  },

  //se acepta una aplicacion
  'aplicaciones.aceptar'(aplicacionId) {
    check(aplicacionId, String);

    const aplicacion = Aplicaciones.findOne(aplicacionId);

    if (aplicacion.idAplicante !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Aplicaciones.update(aplicacionId, { $set: { aceptada: true } });
  },

  //se rechaza una aplicacion
  'aplicaciones.rechazar'(aplicacionId) {
    check(aplicacionId, String);

    const aplicacion = Aplicaciones.findOne(aplicacionId);

    if (aplicacion.idAplicante !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Aplicaciones.update(aplicacionId, { $set: { rechazada: true } });
  },

  'aplicaciones.marcarcomoleida'(aplicacionId) {
    check(aplicacionId, String);

    const aplicacion = Aplicaciones.findOne(aplicacionId);

    if (aplicacion.idAplicante !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Aplicaciones.update(aplicacionId, { $set: { leida: true } });
  },

  'aplicaciones.marcarcomonoleida'(aplicacionId) {
    check(aplicacionId, String);

    const aplicacion = Aplicaciones.findOne(aplicacionId);

    if (aplicacion.idAplicante !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Aplicaciones.update(aplicacionId, { $set: { leida: false } });
  }

});
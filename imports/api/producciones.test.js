import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Producciones } from "./producciones";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { sinon } from "meteor/practicalmeteor:sinon";
import { Factory } from "meteor/dburles:factory";
import faker from "faker";

if (Meteor.isServer) {
  describe("Producciones", () => {
    describe("methods", () => {
      beforeEach(() => {
        resetDatabase();
        Producciones.insert({
          nombre: "nombre temp",
          tipo: "tipo temp",
          lugar: "lugar temp",
          genero: "genero temp",
          grupo: "grupo temp",
          descripcion: "descripcion temp",
          duracion: 123,
        });
      });

      it("se puede borrar una produccion", () => {
        Producciones.remove(Producciones.find().fetch()[0]._id);
        assert.equal(Producciones.find().count(), 0);
      });
      it("se puede modificar una produccion", () => {
        Producciones.update(Producciones.find().fetch()[0]._id,{ $set: { duracion: 321 } });
        assert.equal(Producciones.find().fetch()[0].duracion, 321);
        resetDatabase();
      });
    });
  });
}
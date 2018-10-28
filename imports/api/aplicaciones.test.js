import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Aplicaciones } from "./aplicaciones.js";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { sinon } from "meteor/practicalmeteor:sinon";
import { Factory } from "meteor/dburles:factory";
import faker from "faker";

if (Meteor.isServer) {
  describe("Aplicaciones", () => {
    describe("methods", () => {
      let currentPlayer = faker.name.findName();
      const idPublicadorR = Random.id();
      const idProduccionR = Random.id();

      beforeEach(() => {
        resetDatabase();
        Aplicaciones.insert({
          idPublicador: idPublicadorR,
          idProduccion: idProduccionR,
          nombreProduccion: "nombre prueba",
          aceptada: false,
          createdAt: new Date(),
          idAplicante: 123,
          usernameAplicante: currentPlayer,
        });
      });

      it("se puede borrar una aplicacion", () => {
        Aplicaciones.remove(Aplicaciones.find().fetch()[0]._id);
        assert.equal(Aplicaciones.find().count(), 0);
      });
      it("se puede aceptar una aplicacion", () => {
        Aplicaciones.update(Aplicaciones.find().fetch()[0]._id,{ $set: { aceptada: true } });
        assert.equal(Aplicaciones.find().fetch()[0].aceptada, true);
        resetDatabase();
      });
    });
  });
}
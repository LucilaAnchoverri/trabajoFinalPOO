"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricaDeJuegos = void 0;
var Dados_1 = require("./Dados");
var Ruleta_1 = require("./Ruleta");
var TragamonedasCB_1 = require("./TragamonedasCB");
var TragamonedasTG_1 = require("./TragamonedasTG");
var FabricaDeJuegos = /** @class */ (function () {
    function FabricaDeJuegos() {
    }
    FabricaDeJuegos.prototype.crearJuego = function (juego, atributos) {
        try {
            switch (juego) {
                case "Dados":
                    return new Dados_1.Dados(atributos.numeroDeDados, atributos.saldo);
                case "Ruleta":
                    return new Ruleta_1.Ruleta(atributos.tipoDeApuesta, atributos.apuesta, atributos.saldo);
                case "TragamonedasTiroGratis":
                    return new TragamonedasTG_1.TragamonedasTiroGratis(atributos.saldo);
                case "TragamonedasBonus":
                    return new TragamonedasCB_1.TragamonedasBonus(atributos.saldo);
                default:
                    throw new Error("- El juego que buscas \"".concat(juego, "\" no existe en nuestro casino."));
            }
        }
        catch (E) {
            console.log(E.message);
            return null;
        }
    };
    return FabricaDeJuegos;
}());
exports.FabricaDeJuegos = FabricaDeJuegos;

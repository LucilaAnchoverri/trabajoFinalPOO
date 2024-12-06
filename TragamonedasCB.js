"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TragamonedasBonus = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var TragamonedasBonus = /** @class */ (function (_super) {
    __extends(TragamonedasBonus, _super);
    //aclaración: jackpot es el premio máximo acumulado en un juego de azar.
    //es como una caja donde a medida que el usuario va jugando, se va
    //acumulando cierta cantidad de puntos hasta que se llega al máximo;
    //a menos que el jugador gane en el juego, no podrá retirar lo 
    //acumulado en el jackpot
    function TragamonedasBonus(cSaldo) {
        var _this = _super.call(this, cSaldo) || this;
        _this.jackpot = 0;
        return _this;
    }
    TragamonedasBonus.prototype.pozoJackpot = function (acumularJackpot) {
        this.jackpot += acumularJackpot * 5;
    };
    TragamonedasBonus.prototype.realizarApuesta = function (cantidadApostada) {
        try {
            //llamamos al método de la clase padre usando super
            _super.prototype.realizarApuesta.call(this, cantidadApostada);
            this.pozoJackpot(cantidadApostada); //iguala acumularJackpot a cantidad
        }
        catch (E) {
            console.error("- Error al realizar la apuesta.");
        }
    };
    TragamonedasBonus.prototype.verificarResultado = function (cantidadApostada) {
        var _a = this.resultadoRodillos, r1 = _a[0], r2 = _a[1], r3 = _a[2]; //r1, r2 y r3 son los rodillos
        //Caso 1: Jackpot Grand (los tres rodillos deben tener el mismo valor)
        if (r1 === r2 && r2 === r3) {
            var ganancia = this.jackpot; //a ganancia se le iguala el valor del jackpot
            this.saldo += ganancia; //y acá se le sumao iguala el valor de ganancia a saldo
            console.log("- \u00A1Jackpot Grand! Ganaste el Jackpot Grand con el valor de: $".concat(ganancia, "!"));
            //Caso 2: Jackpot Minor (dos rodillos deben tener el mismo valor)
        }
        else if (r1 === r2 || r2 === r3 || r1 === r3) {
            var ganancia = cantidadApostada * 3;
            this.saldo += ganancia;
            console.log("- \u00A1Jackpot Minor! Ganaste el Jackpot Minor con el valor de: $".concat(ganancia, "!"));
            //Caso 3:no hay premio (perdiste)
        }
        else {
            console.log("- \u00A1Lastima! No ganaste el Jackpot esta vez... \u00A1Sigue intentando!");
            if (this.saldo < 0) { //evita número negativo
                this.saldo = 0;
            }
        }
        console.log("- Tu saldo ahora es de: $".concat(this.saldo));
    };
    return TragamonedasBonus;
}(Tragamonedas_1.Tragamonedas));
exports.TragamonedasBonus = TragamonedasBonus;

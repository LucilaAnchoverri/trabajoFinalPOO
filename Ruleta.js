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
exports.Ruleta = void 0;
var Casino_1 = require("./Casino");
var Ruleta = /** @class */ (function (_super) {
    __extends(Ruleta, _super);
    function Ruleta(cTipoDeApuesta, cApuesta, cSaldo) {
        var _this = _super.call(this, cSaldo) || this;
        _this.tipoDeApuesta = cTipoDeApuesta;
        _this.apuesta = cApuesta;
        _this.numero = 0; //inicializamos en 0
        return _this;
    }
    Ruleta.prototype.colorGanador = function () {
        if (this.numero === 0) { //si es exactamente igual que 0
            return "verde"; //entonces retorna "verde",
        }
        else if (this.numero % 2 === 0) { //si es dividible por 2, significa que es par
            return "negro"; //entonces retorna "negro",
        }
        else { //sino, da por hecho que es impar
            return "rojo"; //entonces retona "rojo".
        }
    };
    Ruleta.prototype.jugar = function () {
        //Gira la ruleta y genera un número aleatorio entre 0 y 36.
        this.numero = Math.floor(Math.random() * 37);
        console.log("- El resultado de la ruleta es: n\u00FAmero ".concat(this.numero, ", color: ").concat(this.colorGanador()));
    };
    Ruleta.prototype.verificarResultado = function (cantidadApostada) {
        var color = this.colorGanador();
        if (this.tipoDeApuesta === "numero" && this.apuesta === this.numero) {
            //- Operador lógico: si tipoDeApuesta es exactamente igual que "numero" y si apuesta es 
            //exactamente igual que el número generado en la propiedad numero; si ambas condiciones
            //se cumplen, es true, por lo tanto entra en el if.
            //- Ganancia por acertar el número exacto:
            var ganancia = cantidadApostada * 5; //multiplica *5 el valor de la apuesta realizada.
            console.log("- \u00A1Su n\u00FAmero (".concat(this.numero, ") es el ganador! Ganaste: $").concat(ganancia, "!"));
        }
        else if (this.tipoDeApuesta === "color" && this.apuesta === color) {
            //- Operador lógico: si tipoDeApuesta es exactamente igual que "color" y si apuesta es 
            //exactamente igual que el color generado en la propiedad color; si ambas condiciones
            //se cumplen, es true, por lo tanto entra en el if.
            //- Ganancia por acertar el color:
            var ganancia = cantidadApostada * 3; //multiplica *3 el valor de la apuesta realizada.
            this.saldo += ganancia;
            console.log("- \u00A1Su color (".concat(color, ") es el ganador! Ganaste: $").concat(ganancia, "!"));
        }
        else {
            if (this.saldo < 0) { //evita número negativo
                this.saldo = 0;
            }
            console.log("- Perdiste, sigue intentando.");
        }
        console.log("Su saldo es de: $".concat(this.saldo));
    };
    return Ruleta;
}(Casino_1.Casino));
exports.Ruleta = Ruleta;

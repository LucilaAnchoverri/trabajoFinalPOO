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
exports.TragamonedasTiroGratis = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var TragamonedasTiroGratis = /** @class */ (function (_super) {
    __extends(TragamonedasTiroGratis, _super);
    function TragamonedasTiroGratis(cSaldo) {
        var _this = _super.call(this, cSaldo) || this;
        _this.tiradasGratis = 0;
        return _this;
    }
    TragamonedasTiroGratis.prototype.tieneTiradasGratis = function () {
        return this.tiradasGratis > 0;
    };
    TragamonedasTiroGratis.prototype.jugar = function () {
        if (this.tieneTiradasGratis()) {
            //queda: si la funcion 'tieneTiradasGratis' es true, entonces entra al if 
            this.tiradasGratis--; //se resta una tirada gratis y consologuea:
            console.log("- Est\u00E1s utilizando una tirada gratis...");
        }
        else if (this.saldo >= this.valorMinimoApuesta) { //si saldo es mayor que valor minimo apuesta
            //si hay saldo pero no tiradas gratis, puede jugar normal
            console.log("- Jugaste usando tu saldo. No tenes tiradas gratis.");
        }
        _super.prototype.jugar.call(this); //se llama al  jugar del padre para que genere el resultado de los rodillos.
    };
    //la idea es que para que te ganés el tiro gratis, tenés que sacar lo que está en los parámetroas de los if.
    TragamonedasTiroGratis.prototype.verificarResultado = function (cantidadApostada, tiradasGratis) {
        var _a = this.resultadoRodillos, r1 = _a[0], r2 = _a[1], r3 = _a[2];
        if (r1 % 2 === 0 && r2 % 2 === 0 && r3 % 2 === 0) { //se verifica si los tres rodillos son pares.
            if (tiradasGratis !== undefined) {
                this.tiradasGratis++; //aumenta las tiradas gratis
                var ganancia = 1000;
                this.saldo += ganancia;
                console.log("- \u00A1Felicidades! Ganaste un tiro gratis por rodillos pares. Ganaste un bono de $".concat(ganancia));
            }
        }
        else if (r1 % 2 !== 0 && r2 % 2 !== 0 && r3 % 2 !== 0) { //si todos los rodillos son impares
            this.tiradasGratis++;
            var ganancia = 500;
            this.saldo += ganancia;
            console.log("- \u00A1Felicidades! Ganaste un tiro gratis por rodillos impares. Ganaste un bono de $".concat(ganancia));
        }
        else { //si no se ganó el tio gratis, pero se proporcionó 'cantidadApostada', 
            //se realiza la resta de la cantidad apostada al saldo:
            if (cantidadApostada !== undefined) {
                this.saldo - cantidadApostada;
            }
            console.log("- \u00A1Lastima! No ganaste una tirada gratis. M\u00E1s suerte para la pr\u00F3xima...");
        }
    };
    return TragamonedasTiroGratis;
}(Tragamonedas_1.Tragamonedas));
exports.TragamonedasTiroGratis = TragamonedasTiroGratis;

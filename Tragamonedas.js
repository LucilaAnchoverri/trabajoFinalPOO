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
exports.Tragamonedas = void 0;
var Casino_1 = require("./Casino");
var Tragamonedas = /** @class */ (function (_super) {
    __extends(Tragamonedas, _super);
    function Tragamonedas(cSaldo) {
        var _this = _super.call(this, cSaldo) || this;
        _this.rodillos = 3;
        _this.resultadoRodillos = [];
        return _this;
    }
    //Métodos de CasinoAbstrac(abstractos):
    Tragamonedas.prototype.jugar = function () {
        //Reinicia el arreglo de resultados
        this.resultadoRodillos = [];
        for (var i = 0; i < this.rodillos; i++) {
            this.resultadoRodillos.push(Math.floor(Math.random() * 10)); //Genera un número aleatorio entre 0 y 9
        }
        var resultado = "~ Rodillos: ";
        for (var i = 0; i < this.resultadoRodillos.length; i++) {
            resultado += this.resultadoRodillos[i];
            if (i < this.resultadoRodillos.length - 1) {
                //el -1 elimina un | de resultado para q no salga ej: 1|1|1| y quede: 1|1|1
                resultado += " | ";
            }
        }
        console.log(resultado);
    };
    //Método común para verificar el resultado que las hijas modificarán según sus necesidades.
    //Verificación de resultados con variantes:
    Tragamonedas.prototype.verificarResultado = function (cantidadApostada) {
        var _a = this.resultadoRodillos, r1 = _a[0], r2 = _a[1], r3 = _a[2]; //r1, r2 y r3 son los rodillos
        if (r1 === r2 && r2 === r3) {
            //lógica:si r1 y r2 son iguales y r2 y r3 son iguales, si ambas condiciones se cumplen,
            //entonces será verdadero(true) y entra en el if.
            console.log("- ¡Ganaste en el Tragamonedas clasico!");
            var ganancia = cantidadApostada;
            this.saldo += ganancia; //Al saldo se le suma la ganancia (q vendria siendo lo apostado)
        }
        else {
            if (this.saldo < 0) { //if para que se evite el saldo negativo y lo iguale a 0:
                this.saldo = 0;
            }
            console.log("- Perdiste. Tu saldo ahora es de: $".concat(this.saldo, "."));
        }
    };
    return Tragamonedas;
}(Casino_1.Casino));
exports.Tragamonedas = Tragamonedas;

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
exports.Dados = void 0;
var Casino_1 = require("./Casino");
var Dados = /** @class */ (function (_super) {
    __extends(Dados, _super);
    function Dados(cNumeroDeDados, cSaldo) {
        var _this = _super.call(this, cSaldo) || this;
        _this.resultadoDados = []; //array de números
        _this.numeroDeDados = cNumeroDeDados;
        return _this;
    }
    //Métodos:
    Dados.prototype.jugar = function () {
        this.resultadoDados = [];
        for (var i = 0; i < this.numeroDeDados; i++) {
            var dado = Math.floor(Math.random() * 6) + 1; //Simula el lanzamiento de un dado
            this.resultadoDados.push(dado); //.push agrega los resultados de "dado" al array resultadoDados.
        }
        var resultado = "~ Números: ";
        for (var i = 0; i < this.resultadoDados.length; i++) {
            resultado += this.resultadoDados[i];
            if (i < this.resultadoDados.length - 1) {
                //el -1 elimina una , de resultado para q no salga ej: 1,2,3, y quede: 1,2,3
                resultado += ", ";
            }
        }
        console.log(resultado);
    };
    Dados.prototype.verificarResultado = function (cantidadApostada) {
        var suma = 0;
        for (var i = 0; i < this.resultadoDados.length; i++) {
            suma += this.resultadoDados[i]; //Acumula el valor de cada dado
        }
        if (this.resultadoDados.every(function (dado) { return dado === 6; })) { // Variante 2: Bonificación por tirar todos 6
            //Comprueba si todos los elementos del array resultadoDados son iguales a 6.
            //La función .every() recorre el array y evalúa si la condición especificada (dado === 6) es
            //verdadera para cada elemento.
            //Si todos los dados son 6, devuelve true. De lo contrario, devuelve false.
            //Si todos los valores son 6:
            var bonificacion = cantidadApostada * 2; //multiplica la cantidad apostada
            console.log("- \u00A1Felicidades! Todos los dados son 6. Ganas un bono de $".concat(bonificacion));
            this.actualizarSaldo(bonificacion); //Actualiza el saldo del jugador sumando la bonificación.
        }
        var sumaMaximaPosible = this.numeroDeDados * 6; //Variante 3: Bonus.
        //Calcula la suma máxima posible al lanzar todos los dados obteniendo 6 en cada uno.
        if (suma >= sumaMaximaPosible * 0.75) { //que gane solo lo apostado
            //Verifica si la suma obtenida alcanza al menos el 75% de la suma máxima.
            console.log("- \u00A1Buen lanzamiento! Salvaste la apuesta: $".concat(cantidadApostada));
            this.actualizarSaldo(cantidadApostada);
        }
        else {
            console.log("- \u00A1Mala suerte! Perdiste. Sigue intentando.");
        }
        console.log("Tu saldo ahora es de: $".concat(this.saldo));
    };
    return Dados;
}(Casino_1.Casino));
exports.Dados = Dados;

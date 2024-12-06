"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var Casino = /** @class */ (function () {
    function Casino(cSaldo) {
        this.valorMinimoApuesta = 500;
        this.saldo = cSaldo;
    }
    Casino.prototype.getNombreJuego = function (gNombre) {
        console.log("El nombre del juego es: ".concat(gNombre, "."));
    };
    Casino.prototype.setValorMinimoDeApuesta = function (sValorMinimo) {
        this.valorMinimoApuesta = sValorMinimo;
    };
    Casino.prototype.obtenerSaldo = function () {
        if (this.saldo < 0) { //evitamos un saldo negativo
            this.saldo = 0;
            return 0;
        }
        return this.saldo;
    };
    //aunque se pierda, este método suma lo apostado al saldo inicial...
    Casino.prototype.actualizarSaldo = function (cantidadApostada) {
        if (this.saldo >= 0) { //si es mayor o igual que 0, entonces sumale o igualale la cantidadApostada
            this.saldo += cantidadApostada;
        }
        console.log("- Su saldo actualizado es de: $".concat(this.saldo));
    };
    Casino.prototype.realizarApuesta = function (cantidadApostada) {
        try {
            if (cantidadApostada <= 0) { //menor o igual que 0
                throw new Error("- La apuesta no puede ser negativa o cero. Debe ingresar un monto mayor a: $".concat(this.valorMinimoApuesta));
            }
            if (this.saldo < cantidadApostada) { //menor que cantidadApostada
                throw new Error("- Su saldo es insuficiente para realizar la apuesta.");
            }
            if (cantidadApostada >= this.valorMinimoApuesta) { //mayor o igual que valorMinimoApuesta
                //Se descuenta la apuesta del saldo inicial
                this.saldo -= cantidadApostada;
                console.log("Apuesta de $".concat(cantidadApostada, " realizada."));
                this.jugar();
                this.verificarResultado(cantidadApostada);
            }
            else {
                console.log("Ha ingresado un valor menor al requerido. La apuesta minima es de: $".concat(this.valorMinimoApuesta)); //EL MENSAJE DE MINIMO DE APUESTA.
            } //Si ocurre un error dentro de try, se captura en el catch.
            //En este caso, simplemente imprime "error" en la consola.
        }
        catch (E) {
            console.log(E.message);
        }
    };
    return Casino;
}());
exports.Casino = Casino;

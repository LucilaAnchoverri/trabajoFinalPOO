import { IJuego } from "./IJuego";

export abstract class Casino implements IJuego {
  protected saldo: number;
  protected valorMinimoApuesta: number = 500;

  constructor(cSaldo: number) {
    this.saldo = cSaldo;
  }

  public getNombreJuego(gNombre: string): void {
    console.log(`El nombre del juego es: ${gNombre}.`);
  }

  public setValorMinimoDeApuesta(sValorMinimo: number): void {
    this.valorMinimoApuesta = sValorMinimo;
  }

  //Métodos abstractos:
  abstract jugar(): void;
  abstract verificarResultado(cantidadApostada: number): void;

  public obtenerSaldo(): number {
    if(this.saldo < 0) {//evitamos un saldo negativo
      this.saldo = 0;
      return 0;
    }
    return this.saldo;
  }

  //aunque se pierda, este método suma lo apostado al saldo inicial...
  public actualizarSaldo(cantidadApostada: number): void {
    if(this.saldo >= 0) { //si es mayor o igual que 0, entonces sumale o igualale la cantidadApostada
      this.saldo += cantidadApostada;
    }
    console.log(`- Su saldo actualizado es de: $${this.saldo}`);
  }

  public realizarApuesta(cantidadApostada: number): void {
    try {
      if(cantidadApostada <= 0) {//menor o igual que 0
        throw new Error(`- La apuesta no puede ser negativa o cero. Debe ingresar un monto mayor a: $${this.valorMinimoApuesta}`);
      } if(this.saldo < cantidadApostada) { //menor que cantidadApostada
        throw new Error("- Su saldo es insuficiente para realizar la apuesta.");
      } if(cantidadApostada >= this.valorMinimoApuesta) {//mayor o igual que valorMinimoApuesta
        //Se descuenta la apuesta del saldo inicial
        this.saldo -= cantidadApostada; 
        console.log(`Apuesta de $${cantidadApostada} realizada.`);
        this.jugar();
        this.verificarResultado(cantidadApostada);
      } else {
        console.log(`Ha ingresado un valor menor al requerido. La apuesta minima es de: $${this.valorMinimoApuesta}`);//EL MENSAJE DE MINIMO DE APUESTA.
      }//Si ocurre un error dentro de try, se captura en el catch.
      //En este caso, simplemente imprime "error" en la consola.
    } catch(E) {
      console.log((E as Error).message);
    }
  }
}

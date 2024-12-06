import { Casino } from "./Casino";

 
export class Ruleta extends Casino{
  private numero: number;
  private apuesta: number | string; //Puede ser un número o un color, por eso |
  private tipoDeApuesta: string; //es decir: "numero" o "color".

  constructor(cTipoDeApuesta: string, cApuesta: number | string, cSaldo: number) {
    super(cSaldo);
    this.tipoDeApuesta = cTipoDeApuesta;
    this.apuesta = cApuesta;
    this.numero = 0; //inicializamos en 0
  }

  public colorGanador(): string {
    if (this.numero === 0) { //si es exactamente igual que 0
      return "verde"; //entonces retorna "verde",
    } else if (this.numero % 2 === 0) { //si es dividible por 2, significa que es par
      return "negro"; //entonces retorna "negro",
    } else { //sino, da por hecho que es impar
      return "rojo"; //entonces retona "rojo".
    }
  }

  public jugar(): void {
    //Gira la ruleta y genera un número aleatorio entre 0 y 36.
    this.numero = Math.floor(Math.random() * 37);
    console.log(`- El resultado de la ruleta es: número ${this.numero}, color: ${this.colorGanador()}`);
  }
  
  public verificarResultado(cantidadApostada: number): void {
    let color = this.colorGanador();
    if (this.tipoDeApuesta === "numero" && this.apuesta === this.numero) { 
      //- Operador lógico: si tipoDeApuesta es exactamente igual que "numero" y si apuesta es 
      //exactamente igual que el número generado en la propiedad numero; si ambas condiciones
      //se cumplen, es true, por lo tanto entra en el if.
      //- Ganancia por acertar el número exacto:
      let ganancia = cantidadApostada * 5; //multiplica *5 el valor de la apuesta realizada.
      console.log(`- ¡Su número (${this.numero}) es el ganador! Ganaste: $${ganancia}!`);
    } else if (this.tipoDeApuesta === "color" && this.apuesta === color) {
      //- Operador lógico: si tipoDeApuesta es exactamente igual que "color" y si apuesta es 
      //exactamente igual que el color generado en la propiedad color; si ambas condiciones
      //se cumplen, es true, por lo tanto entra en el if.
      //- Ganancia por acertar el color:
      let ganancia = cantidadApostada * 3; //multiplica *3 el valor de la apuesta realizada.
      this.saldo += ganancia;
      console.log(`- ¡Su color (${color}) es el ganador! Ganaste: $${ganancia}!`);
    } else {
      if (this.saldo < 0) { //evita número negativo
        this.saldo = 0;
      }
      console.log(`- Perdiste, sigue intentando.`);
    }
    console.log(`Su saldo es de: $${this.saldo}`);
  }
}
import { Tragamonedas } from "./Tragamonedas"

export class TragamonedasBonus extends Tragamonedas{
  private jackpot: number = 0;
    //aclaración: jackpot es el premio máximo acumulado en un juego de azar.
    //es como una caja donde a medida que el usuario va jugando, se va
    //acumulando cierta cantidad de puntos hasta que se llega al máximo;
    //a menos que el jugador gane en el juego, no podrá retirar lo 
    //acumulado en el jackpot

  constructor(cSaldo: number){
    super(cSaldo);
  }

  private pozoJackpot(acumularJackpot: number): void{
    this.jackpot += acumularJackpot * 5;
  }

  public realizarApuesta(cantidadApostada: number): void{
    try {
      //llamamos al método de la clase padre usando super
      super.realizarApuesta(cantidadApostada);
      this.pozoJackpot(cantidadApostada); //iguala acumularJackpot a cantidad
    } catch (E) {
      console.error("- Error al realizar la apuesta.");
    }
  }

  public verificarResultado(cantidadApostada: number): void {
    const [r1, r2, r3] = this.resultadoRodillos; //r1, r2 y r3 son los rodillos
     //Caso 1: Jackpot Grand (los tres rodillos deben tener el mismo valor)
    if (r1 === r2 && r2 === r3) {
      let ganancia = this.jackpot; //a ganancia se le iguala el valor del jackpot
      this.saldo += ganancia; //y acá se le sumao iguala el valor de ganancia a saldo
      console.log(`- ¡Jackpot Grand! Ganaste el Jackpot Grand con el valor de: $${ganancia}!`);

     //Caso 2: Jackpot Minor (dos rodillos deben tener el mismo valor)
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        let ganancia = cantidadApostada * 3;
        this.saldo += ganancia;
        console.log(`- ¡Jackpot Minor! Ganaste el Jackpot Minor con el valor de: $${ganancia}!`);

     //Caso 3:no hay premio (perdiste)
    } else {
      console.log(`- ¡Lastima! No ganaste el Jackpot esta vez... ¡Sigue intentando!`);
      if (this.saldo < 0) { //evita número negativo
        this.saldo = 0;
      }
    }
    console.log(`- Tu saldo ahora es de: $${this.saldo}`);
  }
}



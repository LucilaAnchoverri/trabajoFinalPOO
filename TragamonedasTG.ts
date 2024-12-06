import { Tragamonedas } from "./Tragamonedas";

export class TragamonedasTiroGratis extends Tragamonedas {
  private tiradasGratis: number = 0;

  constructor(cSaldo: number) {
    super(cSaldo);
  }
  
  public tieneTiradasGratis(): boolean {//simple, se usa para saber si hay tiradas gratis
    return this.tiradasGratis > 0;
  }

  public jugar(): void {
    if (this.tieneTiradasGratis()) {
      //queda: si la funcion 'tieneTiradasGratis' es true, entonces entra al if 
      this.tiradasGratis--; //se resta una tirada gratis y consologuea:
      console.log(`- Estás utilizando una tirada gratis...`);
    } else if (this.saldo >= this.valorMinimoApuesta) { //si saldo es mayor que valor minimo apuesta
      //si hay saldo pero no tiradas gratis, puede jugar normal
      console.log("- Jugaste usando tu saldo. No tenes tiradas gratis.");
    } 
    super.jugar(); //se llama al  jugar del padre para que genere el resultado de los rodillos.
  }

  //la idea es que para que te ganés el tiro gratis, tenés que sacar lo que está en los parámetroas de los if.
  public verificarResultado(cantidadApostada?: number, tiradasGratis?: number): void {
    const [r1, r2, r3] = this.resultadoRodillos; 
    if (r1 % 2 === 0 && r2 % 2 === 0 && r3 % 2 === 0) { //se verifica si los tres rodillos son pares.
      if (tiradasGratis !== undefined) {
        this.tiradasGratis++; //aumenta las tiradas gratis
        let ganancia = 1000;
        this.saldo += ganancia;
        console.log(`- ¡Felicidades! Ganaste un tiro gratis por rodillos pares. Ganaste un bono de $${ganancia}`);
      }
    } else if (r1 % 2 !== 0 && r2 % 2 !== 0 && r3 % 2 !== 0) {  //si todos los rodillos son impares
      this.tiradasGratis++;
      let ganancia = 500;
      this.saldo += ganancia;
      console.log(`- ¡Felicidades! Ganaste un tiro gratis por rodillos impares. Ganaste un bono de $${ganancia}`);

    } else {//si no se ganó el tio gratis, pero se proporcionó 'cantidadApostada', 
      //se realiza la resta de la cantidad apostada al saldo:
      if (cantidadApostada !== undefined) {
        this.saldo - cantidadApostada;
      }
      console.log(`- ¡Lastima! No ganaste una tirada gratis. Más suerte para la próxima...`);
    }
  }
}



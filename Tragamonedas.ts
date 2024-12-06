import { Casino } from "./Casino";

export class Tragamonedas extends Casino {
  protected rodillos: number = 3;
  protected resultadoRodillos: number[];

  constructor(cSaldo: number) {
    super(cSaldo);
    this.resultadoRodillos = [];
  }

  //Métodos de CasinoAbstrac(abstractos):
  jugar(): void {
    //Reinicia el arreglo de resultados
    this.resultadoRodillos = [];

    for (let i = 0; i < this.rodillos; i++) {
      this.resultadoRodillos.push(Math.floor(Math.random() * 10)); //Genera un número aleatorio entre 0 y 9
    }
    let resultado = "~ Rodillos: ";
    for (let i = 0; i < this.resultadoRodillos.length; i++) {
      resultado += this.resultadoRodillos[i];
      if (i < this.resultadoRodillos.length - 1) { 
        //el -1 elimina un | de resultado para q no salga ej: 1|1|1| y quede: 1|1|1
        resultado += " | ";
      }
    }
    console.log(resultado);
  }

  //Método común para verificar el resultado que las hijas modificarán según sus necesidades.
  //Verificación de resultados con variantes:
  public verificarResultado(cantidadApostada: number): void {
    const [r1, r2, r3] = this.resultadoRodillos; //r1, r2 y r3 son los rodillos
    if (r1 === r2 && r2 === r3) {
      //lógica:si r1 y r2 son iguales y r2 y r3 son iguales, si ambas condiciones se cumplen,
      //entonces será verdadero(true) y entra en el if.
      console.log("- ¡Ganaste en el Tragamonedas clasico!");
      let ganancia = cantidadApostada;
      this.saldo += ganancia;//Al saldo se le suma la ganancia (q vendria siendo lo apostado)
    } else {
      if (this.saldo < 0) {//if para que se evite el saldo negativo y lo iguale a 0:
        this.saldo = 0;
      }
      console.log(`- Perdiste. Tu saldo ahora es de: $${this.saldo}.`);
    } 
  }
}


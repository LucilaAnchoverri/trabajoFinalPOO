import { Casino } from "./Casino";

export class Dados extends Casino {
  private numeroDeDados: number;
  private resultadoDados: number[] = []; //array de números

  constructor(cNumeroDeDados: number, cSaldo: number) {
    super(cSaldo);
    this.numeroDeDados = cNumeroDeDados;
  }

  //Métodos:
  public jugar(): void {
    this.resultadoDados = [];
    for (let i = 0; i < this.numeroDeDados; i++) {
      const dado = Math.floor(Math.random() * 6) + 1; //Simula el lanzamiento de un dado
      this.resultadoDados.push(dado);//.push agrega los resultados de "dado" al array resultadoDados.
    }
    let resultado = "~ Números: ";
    for (let i = 0; i < this.resultadoDados.length; i++) {
      resultado += this.resultadoDados[i];
      if (i < this.resultadoDados.length - 1) { 
      //el -1 elimina una , de resultado para q no salga ej: 1,2,3, y quede: 1,2,3
        resultado += ", ";
      }
    }
    console.log(resultado);
  }

  public verificarResultado(cantidadApostada: number): void {
    let suma = 0;
    for (let i = 0; i < this.resultadoDados.length; i++) {
      suma += this.resultadoDados[i]; //Acumula el valor de cada dado
    }
    if(this.resultadoDados.every((dado) => dado === 6)) { // Variante 2: Bonificación por tirar todos 6
      //Comprueba si todos los elementos del array resultadoDados son iguales a 6.
      //La función .every() recorre el array y evalúa si la condición especificada (dado === 6) es
      //verdadera para cada elemento.
      //Si todos los dados son 6, devuelve true. De lo contrario, devuelve false.
      //Si todos los valores son 6:
      const bonificacion = cantidadApostada * 2; //multiplica la cantidad apostada
      console.log(`- ¡Felicidades! Todos los dados son 6. Ganas un bono de $${bonificacion}`);
      this.actualizarSaldo(bonificacion); //Actualiza el saldo del jugador sumando la bonificación.
    }
    const sumaMaximaPosible = this.numeroDeDados * 6; //Variante 3: Bonus.
    //Calcula la suma máxima posible al lanzar todos los dados obteniendo 6 en cada uno.
    if(suma >= sumaMaximaPosible * 0.75) { //que gane solo lo apostado
      //Verifica si la suma obtenida alcanza al menos el 75% de la suma máxima.
      console.log(`- ¡Buen lanzamiento! Salvaste la apuesta: $${cantidadApostada}`); 
      this.actualizarSaldo(cantidadApostada);
    } else {
      console.log(`- ¡Mala suerte! Perdiste. Sigue intentando.`);
    }
    console.log(`Tu saldo ahora es de: $${this.saldo}`)
  }
}
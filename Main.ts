import * as readlineSync from 'readline-sync';
import * as fs from 'fs';
import { Casino } from './Casino';
import { FabricaDeJuegos } from './FabricaDeJuegos';
import { Dados } from './Dados';
import { Ruleta } from './Ruleta';
import { TragamonedasTiroGratis } from './TragamonedasTG';
import { TragamonedasBonus } from './TragamonedasCB';

//instanciamos la fábrica de juegos:
const fabrica = new FabricaDeJuegos();

//función para mostrar el menú:
function mostrarMenu(): void {
  console.log("\n ¡Bienvenido al Casino Perla Negra! - Elija un juego");
  console.log("1. Jugar a Dados del Tesoro Perdido");
  console.log("2. Jugar a Ruleta del Cofre de la Fortuna");
  console.log("3. Jugar a Tragamonedas (tiro gratis) La Trampa del Kraken");
  console.log("4. Jugar a Tragamonedas (con bonus) del Capitan Barbanegra");
  console.log("5. Generar comprobante de juego (TXT)");
  console.log("6. Salir \n");
}
mostrarMenu();

let saldoAcumulado = 0;
let saldoFinal = 0; //se almacena el saldo final.

let juegosJugados = ""; //variable para acumular los juegos jugados

let Pdados: Dados | null = null;
let Pruleta: Ruleta | null = null;
let tragamonedasTG: TragamonedasTiroGratis | null = null;
//Almacena la instancia del juego Tragamonedas Tiro Gratis;
//esto se hace para que luego cuando el usuario vuelva a jugar el juego,
//le permita utilizar esa/s tirada/s gratis que haya conseguido.
let tragamonedasCB: TragamonedasBonus | null = null;

let continuar = true;//lógica del juego:


while (continuar) {
  const opcion = readlineSync.questionInt("\n - Seleccione una opcion: "); //la \n es para que baje una línea y no quede pegado.
  let juego: Casino | null = null;

  switch (opcion) {
    case 1:
      console.log("¡Bienvenido al juego de Dados del Tesoro Perdido!");

      if (!Pdados) { //si Pdados es 'null', es porque el juego no ha sido creado todavía.
        //Entonces, si no hay instancia previa, se pide el saldo y se crea el juego:
        const saldoDados = readlineSync.questionInt("- Ingrese saldo: $");

        if (isNaN(saldoDados) || saldoDados <= 0)  {
          //si no es numero o es menor a 0, entonces consologuea:
          console.log("- Por favor, ingresa un saldo valido.");
          break;
        }

        // Crear la instancia utilizando la fábrica
        Pdados = fabrica.crearJuego("Dados", { numeroDeDados: 2, saldo: saldoDados }) as Dados;
        //'as Dados' le dice a TypeScript que confíe en que el valor devuelto
        //por 'crearJuego' es un objeto de tipo 'Dados', aunque 'crearJuego' 
        //pueda devolver una instancia más genérica (CasinoAbstrac).
        juegosJugados += "- Dados "; // Registrar el juego jugado

      } else {
        //Verificar el saldo antes de reutilizar la instancia:
        if (saldoAcumulado <= 0) { //si es menor o igual a 0, consologuea:
          console.log("- No tienes saldo suficiente para continuar jugando.");
          Pdados = null; //Resetea la instancia del juego
          break;
        }
        //en caso de que ya exista una instancia de tragamonedas, se reutilizará
        //tampoco solicita saldo de nuevo.
        console.log(`- Sigues jugando en Dados. Tu saldo disponible para apostar es de: $${saldoAcumulado}`);
        juegosJugados += "- Dados "; //acumula el nombre del juego.
      }

      juego = Pdados;
    break;

    case 2:
      console.log("¡Bienvenido al juego de Ruleta del Cofre de la Fortuna!");

      if (!Pruleta) { //si Pruleta es 'null', es porque el juego no ha sido creado todavía.
        //Entonces, si no hay instancia previa, se pide el saldo y se crea el juego:
        const saldoRuleta = readlineSync.questionInt("- Ingrese saldo: $");

        if (isNaN(saldoRuleta) || saldoRuleta <= 0) {
          //si no es un numero o es menor a 0, entonces consologuea:
          console.log("- Por favor, ingresa un saldo valido.");
          break;
        }
                
        //Pregunta qué tipo de apuesta desea hacer (color o número):
        const tipoApuesta = readlineSync.question("- Queres apostar por color (rojo/negro) o por numero (0-36)? (Ingrese 'color' o 'numero'): ").toLowerCase();
        let apuesta: string | number;

        if (tipoApuesta === "numero") {
          //si apuesta por "numero", se le pide uno entre 0 y 36:
          const numeroApuesta = readlineSync.questionInt("- Ingrese el numero a apostar (0-36): ");
          if (numeroApuesta < 0 || numeroApuesta > 36 || isNaN(numeroApuesta)) {
            //si es menor a 0, mayor a 36 o no es un numero,
            //si es alguna de ellas, entonces consologuea:
            console.log("- El numero que ha ingresado es invalido. Se asignara el numero 0 por defecto.");
            apuesta = 0;
          } else {
            apuesta = numeroApuesta;
          }
        } else if (tipoApuesta === "color") {
          //si la apuesta es "color", se le pide que sea 'rojo' o 'negro':
          const colorApuesta = readlineSync.question("- Ingrese el color a apostar (rojo o negro): ");
          if (colorApuesta !== "rojo" && colorApuesta !== "negro") {
            //si es distinto a 'rojo' y distinto a 'negro', entonces consologuea:
            console.log("- El color que ha ingresado es invalido. Se asignara 'rojo' por defecto.");
            apuesta =  "rojo";
          } else {
            apuesta = colorApuesta;
          }
        } else { //manejo de opciones inválidas:
          console.log("- La opcion que ha ingresado no es valida.");
          break;
        }

        //Crea la instancia utilizando l fabrica:
        Pruleta = fabrica.crearJuego("Ruleta", { tipoDeApuesta: tipoApuesta, apuesta: apuesta, saldo: saldoRuleta }) as Ruleta;; 
        //'as Ruleta' le dice a TypeScript que confíe en que el valor devuelto
        //por 'crearJuego' es un objeto de tipo 'Ruleta', aunque 'crearJuego' 
        //pueda devolver una instancia más genérica (CasinoAbstrac).
        juegosJugados += "- Ruleta "; // Registrar el juego jugado

      } else {
        //Verificar el saldo antes de reutilizar la instancia:
        if (saldoAcumulado <= 0) { //si es menor o igual a 0, consologuea:
          console.log("- No tienes saldo suficiente para continuar jugando.");
          Pruleta = null; //resetea la instancia del juego
          break;
        }
        //en caso de que ya exista una instancia de tragamonedas, se reutilizará
        //tampoco solicita saldo de nuevo.
        console.log(`- Sigues jugando en Ruleta. Tu saldo disponible para apostar es de: $${saldoAcumulado}`);
        juegosJugados += "- Ruleta "; //acumula el nombre del juego
      }

      juego = Pruleta;
    break;

    case 3:
      console.log("¡Bienvenido al juego de Tragamonedas (tiro gratis) La Trampa del Kraken!");

      if (!tragamonedasTG){ //si tragamonedasTG es 'null', es porque el juego no ha sido creado todavía.
        //Entonces, si no hay instancia previa, se pide el saldo y se crea el juego:
        const saldoTragamonedasTG = readlineSync.questionInt("- Ingrese saldo: $");
        if (isNaN(saldoTragamonedasTG) || saldoTragamonedasTG <= 0) {
          //si no es numero o es menor a 0, entonces consologuea:
          console.log("- Por favor, ingresa un saldo valido.");
          break;
        }
        tragamonedasTG =  fabrica.crearJuego("TragamonedasTiroGratis", { saldo: saldoTragamonedasTG }) as TragamonedasTiroGratis;//Pasa un objeto
        //'as TragamonedasTiroGratis' le dice a TypeScript que confíe en que el valor devuelto
        //por 'crearJuego' es un objeto de tipo 'TragamonedasTiroGratis', aunque 'crearJuego' 
        //pueda devolver una instancia más genérica (CasinoAbstrac).
        juegosJugados += "- Tragamonedas Tiro Gratis "; //acumula el nombre del juego.
        saldoAcumulado = tragamonedasTG.obtenerSaldo(); // Sincroniza saldoAcumulado con la instancia

      } else {
        saldoAcumulado = tragamonedasTG.obtenerSaldo(); // Sincroniza el saldo acumulado antes de reutilizar
        // Verificar el saldo antes de reutilizar la instancia
        if (saldoAcumulado <= 0) {
            console.log("- No tienes saldo suficiente para continuar jugando.");
            tragamonedasTG = null; // Resetea la instancia del juego
            break;
        }
        //en caso de que ya exista una instancia de tragamonedas, se reutilizará
        //tampoco solicita saldo de nuevo.
        console.log(`- Sigues jugando en Tragamonedas Tiro Gratis. Tu saldo disponible para apostar es de: $${saldoAcumulado}`);
        juegosJugados += "- Tragamonedas Tiro Gratis "; //acumula el nombre del juego.

      }
    break;
      
    case 4:
      console.log("¡Bienvenidos al juego Tragamonedas (con bonus) del Capitan Barbanegra!");

      if (!tragamonedasCB) { //si tragamonedasBC es 'null', es porque el juego no ha sido creado todavía.
        //Entonces, si no hay instancia previa, se pide el saldo y se crea el juego:
        const saldoTragamonedasCB = readlineSync.questionInt("- Ingrese saldo: $");
        if (isNaN(saldoTragamonedasCB) || saldoTragamonedasCB <= 0) {
          //si no es numero o es menor a 0, entonces consologuea:
          console.log("- Por favor, ingresa un saldo válido.");
          break;
        }

        tragamonedasCB = fabrica.crearJuego("TragamonedasBonus", { saldo: saldoTragamonedasCB }) as TragamonedasBonus;
        //'as TragamonedasBonus' le dice a TypeScript que confíe en que el valor devuelto
        //por 'crearJuego' es un objeto de tipo 'TragamonedasBonus', aunque 'crearJuego' 
        //pueda devolver una instancia más genérica (CasinoAbstrac).
        juegosJugados += "- Tragamonedas con Bonus ";
      } else {
        //verificar el saldo antes de reutilizar la instancia
        if (saldoAcumulado <= 0) { //si es menor o igual a 0, consologuea:
          console.log("- No tienes saldo suficiente para continuar jugando.");
          tragamonedasCB = null; //resetea la instancia del juego
          break;
        }

        //Si la instancia ya existe, se reutiliza
        console.log(`- Sigues jugando en Tragamonedas con Bonus. Tu saldo disponible para apostar es de: $${saldoAcumulado}`);
        juegosJugados += "- Tragamonedas con Bonus "; //acumula el nombre del juego.
      }

      juego = tragamonedasCB;
    break;
    
    case 5:
      generarComprobante(juegosJugados, saldoFinal);
    continue; //continúa al siguiente ciclo.

    case 6:
      console.log("- Gracias por jugar. ¡Hasta la proxima!");
      continuar = false;
    break;

    default:
      console.log("- Opcion invalida, por favor seleccione una opcion del menu.");
    continue;
  }


  if (!continuar) {
    break; //sale del ciclo si continuar es falso
  }
  
  if (juego) { //Si el juego fue creado correctamente, entonces se ejecuta:
    console.log("- Cargando juego...")
    const apuesta = readlineSync.questionInt("- Ingrese la cantidad que desea apostar: $");
    juego.realizarApuesta(apuesta);
    saldoAcumulado = juego.obtenerSaldo(); //actualiza el saldo después del juego.
    saldoFinal += saldoAcumulado; //Suma el saldo acumulado al saldo final

  } else if (tragamonedasTG) {
    if (!tragamonedasTG.tieneTiradasGratis()) { //Verificar si hay tiradas gratis disponibles
      //solicita la apuesta si no hay tiradas gratis:
      const cantidadApostada = readlineSync.questionInt("- Ingrese la cantidad que desea apostar: $ ");
      tragamonedasTG.realizarApuesta(cantidadApostada);  //realiza la apuesta y juega
      saldoAcumulado -= cantidadApostada; //le actualiza el saldo acumulado restando la apuesta
      saldoAcumulado = tragamonedasTG.obtenerSaldo(); //Actualiza el saldo con el resultado del juego

    } else { //si tiene tiradas gratis, consologuea:
      console.log("- Tenes una tirada gratis disponible, ¡no es necesario apostar!");
      //se ejecuta la tirada gratis:
      tragamonedasTG.jugar(); //realiza una tirada gratis(hace girar los rodillos)
      tragamonedasTG.verificarResultado()//verifica el resultado
      saldoAcumulado = tragamonedasTG.obtenerSaldo(); //actualiza el saldo después del juego
    } 
    console.log(`- El saldo en su cuenta es de: $${saldoAcumulado}`);
    saldoFinal += saldoAcumulado; //acumula el saldo restante
  }
}


//Función para generar un comprobante en formato '.txt':
function generarComprobante(juegos: string, saldoFinal: number): void {
  const comprobante = `\n
  - TICKET DE JUEGO -
  ~ Juegos Jugados: ${juegos}
  ~ Saldo Final: $${saldoFinal}
  ~ Fecha: ${new Date().toLocaleString()}
  \n`;

  //Escribe en un archivo: 'ticket.txt'
  fs.writeFileSync('ticket.txt', comprobante);
  console.log("- ¡Ticket generado correctamente en 'ticket.txt'!");
}
import { Casino } from "./CasinoAbstract";
import { Dados } from "./Dados";
import { Ruleta } from "./Ruleta";
import { TragamonedasBonus } from "./TragamonedasCB";
import { TragamonedasTiroGratis } from "./TragamonedasTG";

export class FabricaDeJuegos {
  crearJuego(juego: string, atributos: any): Casino | null {
    try {
      switch (juego) {
        case "Dados":
          return new Dados(atributos.numeroDeDados, atributos.saldo);
        case "Ruleta":
          return new Ruleta(atributos.tipoDeApuesta, atributos.apuesta, atributos.saldo);
        case "TragamonedasTiroGratis":
          return new TragamonedasTiroGratis(atributos.saldo);
        case "TragamonedasBonus":
          return new TragamonedasBonus(atributos.saldo);
        default:  
          throw new Error(`- El juego que buscas "${juego}" no existe en nuestro casino.`);
      }
    } catch(E) {
      console.log(E.message);
      return null; 
    }
  }
}


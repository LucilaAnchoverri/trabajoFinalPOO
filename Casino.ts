import { IJuego } from "./IJuego";

export abstract class Casino implements IJuego{
  protected saldo:number;
  protected valorMinimoApuesta:number = 500;

  constructor(cSaldo:number) {
    this.saldo = cSaldo;

  }

  getNombreJuego(gNombre:string):void{
    console.log(`El nombre del juego es: ${gNombre}`);
  }

  setValorMinimoDeApuesta(sValorMinimo:number):void{
    this.valorMinimoApuesta = sValorMinimo;
    console.log(`El monto minimo de apuesta para este juego es de $${sValorMinimo}`);
  }

  abstract jugar():void;

  abstract verificarResultado(cantidadApostada:number):void;

  public obtenerSaldo():number{
    if(this.saldo < 0){
      this.saldo = 0;
      return 0;
    }
    console.log(`Su saldo acumulado es de: ${this.saldo}.`);
    return this.saldo;
  }

  public actualizarSaldo(cantidadApostada: number):void{
    if(this.saldo >= 0){
      this.saldo += cantidadApostada;
    }
    console.log(`Saldo actualizado: $${this.saldo}.`);
  }

  public realizarApuesta(cantidadApostada:number):void{
    try{
      if(cantidadApostada <= 0){
        throw new Error(`La apuesta no puede ser negativa o cero.`);
      }else if(this.saldo < cantidadApostada){
        throw new Error("Saldo insuficiente para realizar la apuesta.");
      }else if(cantidadApostada >= this.valorMinimoApuesta){
        this.saldo -= cantidadApostada;  // Descuenta la apuesta del saldo inicial
        console.log(`Apuesta de $${cantidadApostada} realizada.`);
        this.jugar();
        this.verificarResultado(cantidadApostada);        

      }else {
        throw new Error(`La apuesta mínima es de $${this.valorMinimoApuesta}.`);
      }
    
    }catch(E) {
      console.error("error")
    }
  }
  
  
}

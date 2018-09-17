import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'saldo'
})
export class SaldoPipe implements PipeTransform {

  transform(value: any, args?: any): any {

   var  obj = this.getHoursAndMinutes(value);
   this.normalize(obj)   
   return obj.horas+":"+obj.minutos;

  }

  getHoursAndMinutes(saldo:any){

    var saldoinminutes = Math.trunc(saldo/60000)
    var horas = Math.trunc(saldoinminutes / 60)
    var minutos = saldoinminutes % 60
    
    return {horas:horas,minutos:minutos};
    
  }

  isNegative(saldo){
    return saldo < 0
  }

  normalize(obj:any){

    if (obj.horas < 10 && obj.horas > 0 ){
      obj.horas = "0"+obj.horas
    } 
    if(obj.horas > -9 && obj.horas < 0){
      obj.horas = "-0"+Math.abs(obj.horas) 
    }
    if (obj.minutos < 0){
      obj.minutos = obj.minutos * -1
    }
    if (obj.minutos < 10){
      obj.minutos = "0"+obj.minutos
    }

  }

}

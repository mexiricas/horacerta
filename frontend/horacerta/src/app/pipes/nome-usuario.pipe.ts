import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomeUsuario'
})
export class NomeUsuarioPipe implements PipeTransform {

  transform(nomeUsuario: any): any {
    if (nomeUsuario) {
      let nomeFinal = [];
      nomeFinal.push(nomeUsuario.split(" ")[0]);
      nomeFinal.push(nomeUsuario.split(" ")[1]);
      return nomeFinal.join(" ");
    } else {
      return nomeUsuario;
    }
  }

}

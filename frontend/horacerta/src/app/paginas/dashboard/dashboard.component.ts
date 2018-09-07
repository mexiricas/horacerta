import { Component, OnInit } from '@angular/core';

import { PontoService } from '../../servicos/ponto.service';

@Component({
  selector: 'hr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  parametros: any = {
    entrada: null,
    pausa: null,
    retorno: null,
    saida: null,
    dataRegistro: null
  }

  horaAtual;
  dataAtual;
  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  mes;
  constructor(
    private pontoService: PontoService
  ) { }

  ngOnInit() {
    this.horaCerta();
    this.dataCerta();
  }

  horaCerta() {
    setInterval(() => {
      this.horaAtual = ((new Date).toLocaleString().substr(11, 8));
    }, 1000);
  }

  dataCerta() {
    const hoje = new Date();
    this.mes = (hoje.getMonth()) % 13;
    this.dataAtual = ('0' + (hoje.getDate())).substr(-2) + ' de ' + this.meses[this.mes] + ' de ' + hoje.getFullYear();
  }

  registrarPonto() {
    const hoje = new Date();
    this.parametros.dataRegistro = hoje.getFullYear() + '-' + ('0' + (hoje.getMonth())).substr(-2) + '-' + ('0' + (hoje.getDate())).substr(-2);;
    this.pontoService.consultarPonto(this.parametros).subscribe(p => {


      switch (p || !p) {
        case !this.parametros.entrada:
          console.log(this.horaAtual);
          this.parametros.entrada = this.horaAtual;
          console.log(this.parametros);
          break;
        case !this.parametros.pausa:
          console.log(this.horaAtual);
          this.parametros.pausa = this.horaAtual;
          console.log(this.parametros);
          break;
        case !this.parametros.retorno:
          this.parametros.retorno = this.horaAtual;
          break;
        case !this.parametros.saida:
          this.parametros.saida = this.horaAtual;
          break;
        default:
          break;
      }
    });



  }
}

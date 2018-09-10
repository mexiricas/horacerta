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
    dataRegistro: null,
    idPessoa: 1
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

  salvarPonto() {
    this.pontoService.salvarPonto(this.parametros).subscribe(() => { });
  }

  registrarPonto() {
    const hoje = new Date();
    this.parametros.dataRegistro = hoje.getFullYear() + '-' + ('0' + (hoje.getMonth())).substr(-2) + '-' + ('0' + (hoje.getDate())).substr(-2) + ' ' + this.horaAtual;

    this.pontoService.consultarPonto(this.parametros).subscribe(p => {
      switch (p || !p) {
        case !this.parametros.entrada:
          this.parametros.entrada = this.parametros.dataRegistro;
          console.log(this.parametros);

          //this.salvarPonto();
          break;
        case !this.parametros.pausa:
          console.log("entrou");
          this.parametros.pausa = this.horaAtual;
          //this.pontoService.salvarPonto(this.parametros);
          break;
        case !this.parametros.retorno:
          this.parametros.retorno = this.horaAtual;
          //this.pontoService.salvarPonto(this.parametros);
          break;
        case !this.parametros.saida:
          this.parametros.saida = this.horaAtual;
          //this.pontoService.salvarPonto(this.parametros);
          break;
        default:
          break;
      }
    });



  }
}

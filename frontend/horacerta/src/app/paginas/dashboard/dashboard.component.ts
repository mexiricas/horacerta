import { Component, OnInit } from '@angular/core';

import { PontoService } from '../../servicos/ponto.service';
import { PessoaService } from '../../servicos/pessoa.service';

@Component({
  selector: 'hr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  parametros: any = {
    id: null,
    entrada: null,
    pausaini: null,
    pausafim: null,
    saida: null,
    dataRegistro: null,
    pessoa: {}
  }

  horaAtual;
  dataAtual;
  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  mes;
  constructor(
    private pontoService: PontoService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
    this.horaCerta();
    this.dataCerta();
    this.pessoaService.consultarPessoa().subscribe(pessoa => {
      this.parametros.pessoa = pessoa;
      this.parametros.pessoa.id = this.pessoaService.idPessoa;
      this.existeRegistroDia();
    });

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
    this.pontoService.salvarPonto(this.parametros).subscribe(p => {
      this.parametros = p;
    });
  }

  existeRegistroDia() {
    const hoje = new Date();
    this.parametros.dataRegistro = hoje.getFullYear() + '-' + ('0' + (hoje.getMonth() + 1)).substr(-2) + '-' + ('0' + (hoje.getDate())).substr(-2);;

    this.pontoService.consultarPonto(this.parametros).subscribe(p => {

      if (p) {
        this.parametros = p;
      }
    });
  }

  registrarPonto() {

    this.existeRegistroDia();

    switch (true) {
      case !this.parametros.entrada:
        this.parametros.entrada = new Date();
        this.salvarPonto();
        break;
      case !this.parametros.pausaini:
        this.parametros.pausaini = new Date();
        this.salvarPonto();
        break;
      case !this.parametros.pausafim:
        this.parametros.pausafim = new Date();
        this.salvarPonto();
        break;
      case !this.parametros.saida:
        this.parametros.saida = new Date();
        this.salvarPonto();
        break;
      default:
        break;
    }
  }

}

import { Component, OnInit, EventEmitter } from '@angular/core';

import { PontoService } from '../../servicos/ponto.service';
import { PessoaService } from '../../servicos/pessoa.service';


@Component({
  selector: 'hr-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  registros: any = [];
  filtroHistorico: any = [];
  saldoTotal: number = 0;

  parametros: any = {
    id: null,
    entrada: null,
    pausaini: null,
    pausafim: null,
    saida: null,
    dataRegistro: null,
    pessoa: {}
  }

  pagina: number = 0;
  qtdPorPagina: number = 10;
  qtdPaginas: number;
  totalRegistro;
  habilitarBotao = false;

  static atualizacao = new EventEmitter<any>();

  constructor(
    private pontoService: PontoService,
    private pessoaService: PessoaService) { }

  ngOnInit() {
    this.pessoaService.consultarPessoa().subscribe(pessoa => {
      this.parametros.pessoa = pessoa;
      this.parametros.pessoa.id = this.pessoaService.idPessoa;
      this.anoAtual();
      this.listar();
    });
  }

  listar() {
    this.pontoService.listar(this.parametros).subscribe(dados => {
      this.registros = dados;
      this.calculaSaldo();
    });
  }

  paginar($event: any) {
    this.pagina = $event - 1;
    this.qtdPaginas = Math.ceil(this.registros.length / this.qtdPorPagina);
    this.popularTabela(this.registros);
    HistoricoComponent.atualizacao.emit(this.qtdPaginas);
  }

  popularTabela(p) {
    this.filtroHistorico = [];
    for (let i = (this.pagina * this.qtdPorPagina); i < (this.pagina * this.qtdPorPagina + (+this.qtdPorPagina)); i++) {
      if (i >= p.length) {
        break;
      }
      this.filtroHistorico.push(p[i]);
    }
    this.totalRegistro = p.length;
    this.qtdPaginas = Math.ceil(p.length / this.qtdPorPagina);
    HistoricoComponent.atualizacao.emit(this.qtdPaginas);
    return this.filtroHistorico;
  }


  anoAtual() {
    const date = new Date();
    this.parametros.ano = date.getFullYear();
    this.parametros.mes = (date.getMonth() + 1) % 13;

    this.parametros.dataInicial = `${this.parametros.ano}${('0' + (date.getMonth() + 1)).substr(-2)}01`;
    this.parametros.dataFinal = `${this.parametros.ano}${('0' + ((date.getMonth() + 2) % 13)).substr(-2)}01`;
  }

  calculaSaldo() {
    this.registros.forEach((element) => {
      this.saldoTotal += element.saldo;
      console.log(element.saldo);
      console.log(this.saldoTotal);
      
    });
  }
}
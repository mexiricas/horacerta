import { Component, OnInit, EventEmitter } from '@angular/core';

import { PontoService } from '../../servicos/ponto.service';


@Component({
  selector: 'hr-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  registros: any = [];
  filtroHistorico: any = [];

  pagina: number = 0;
  qtdPorPagina: number = 10;
  qtdPaginas: number;
  totalRegistro;
  habilitarBotao = false;

  static atualizacao = new EventEmitter<any>();

  constructor(private pontoService: PontoService) { }

  ngOnInit() {
    this.listar({ dataInicial: null, dataFinal: null })
  }

  listar(parametros) {
    this.pontoService.listar(parametros).subscribe(dados => {
      this.registros = dados;
    });
  }

  paginar($event: any) {
    this.pagina = $event - 1;
    this.qtdPaginas = Math.ceil(this.registros.itens.length / this.qtdPorPagina);
    this.popularTabela(this.registros.itens);
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

  pesquisarVendas() {}


}
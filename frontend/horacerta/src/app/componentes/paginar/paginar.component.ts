import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HistoricoComponent } from '../../paginas/historico/historico.component';

@Component({
  selector: 'hr-paginar',
  templateUrl: './paginar.component.html',
  styleUrls: ['./paginar.component.css']
})
export class PaginarComponent implements OnInit {

  public static readonly TOTAL_PAGS_PADRAO: number = 10;
  public static readonly PAG_PADRAO: number = 1;
  public static readonly REG_PADRAO: number = 0;
  public static readonly ADJACENTES_PADRAO: number = 1;

  @Input() qtdPorPagina: number;
  @Input() totalRegistros: number;
  @Input() qtdAdjacentes: number;
  @Output() onPaginate: EventEmitter<number> = new EventEmitter<number>();

  pagina: number;
  paginas: Array<number>;
  exibirProximo: boolean;
  qtdPaginas: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.qtdAdjacentes = this.qtdAdjacentes || PaginarComponent.ADJACENTES_PADRAO;
    this.qtdPorPagina = this.qtdPorPagina || PaginarComponent.TOTAL_PAGS_PADRAO;
    this.pagina = +this.route.snapshot.queryParams['pagina'] || PaginarComponent.PAG_PADRAO;
    this.totalRegistros = this.totalRegistros || PaginarComponent.REG_PADRAO;
    this.qtdPaginas = Math.ceil(this.totalRegistros / this.qtdPorPagina);
    this.gerarLinks();
    this.atualizarQtdPaginas();
  }


  gerarLinks() {
    this.exibirProximo = this.qtdPaginas !== this.pagina;
    this.paginas = [];
    let iniAdjacente = (this.pagina - this.qtdAdjacentes <= 0) ? 1 :
      (this.pagina - this.qtdAdjacentes);
    let fimAdjacente = (this.pagina + this.qtdAdjacentes >= this.qtdPaginas) ?
      this.qtdPaginas : (this.pagina + this.qtdAdjacentes);
    for (let i = iniAdjacente; i <= fimAdjacente; i++) {
      this.paginas.push(i);
    }
  }


  paginar(pagina: number, $event: any) {
    $event.preventDefault();
    this.pagina = pagina;
    this.qtdPaginas = Math.ceil(this.totalRegistros / this.qtdPorPagina);
    this.gerarLinks();
    this.onPaginate.emit(pagina);
  }

  atualizarQtdPaginas() {
    HistoricoComponent.atualizacao.subscribe(f => {
      this.qtdPaginas = f;
      this.gerarLinks();
    });

  }

}

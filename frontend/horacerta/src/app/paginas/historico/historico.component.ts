import { Component, OnInit } from '@angular/core';

import { PontoService } from '../../servicos/ponto.service';


@Component({
  selector: 'hr-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  registros: any = []
  totalRegistro = 0

  constructor(private pontoService: PontoService) { }

  ngOnInit() {
    this.listar({ dataInicial: null, dataFinal: null})
  }

  listar(parametros) {
    this.pontoService.listar(parametros).subscribe(dados => {
      this.registros = dados;
    });


  }


}
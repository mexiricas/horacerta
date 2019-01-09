import { LIMITE_MINIMO_TAMANHO_HORA } from './../../app.api';
import { Component, OnInit, EventEmitter } from '@angular/core';

import { PontoService } from '../../servicos/ponto.service';
import { PessoaService } from '../../servicos/pessoa.service';
import { InputHora } from '../../util/input.hora.util';
import { InputData } from '../../util/input.data.util';
import { DatePipe } from '@angular/common';
import { AlertCreator } from '../../util/alert.util';


@Component({
  selector: 'hr-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
  providers: [InputHora, AlertCreator, InputData]
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
    dataIni: null,
    dataFim: null,
    pessoa: {}
  }

  pontoAtual: any = {
    id: null,
    entrada: null,
    pausaini: null,
    pausafim: null,
    saida: null,
    dataRegistro: null,
    pessoa: {}
  }

  novoPonto = {
    id: null,
    entrada: null,
    pausaini: null,
    pausafim: null,
    saida: null,
    dataRegistro: null
  }

  pagina: number = 0;
  qtdPorPagina: number = 10;
  qtdPaginas: number;
  totalRegistro;
  tamMinimo = LIMITE_MINIMO_TAMANHO_HORA;

  atributosPonto = ['entrada', 'pausaini', 'pausafim', 'saida'];

  customPatterns = {
    '0': { pattern: new RegExp('[0-9-]+') }
  };


  static atualizacao = new EventEmitter<any>();

  constructor(
    private pontoService: PontoService,
    private pessoaService: PessoaService,
    private alertCreator: AlertCreator,
    private horaUtil: InputHora,
    private dataUtil: InputData) { }

  ngOnInit() {
    this.pessoaService.consultarPessoa().subscribe(pessoa => {
      this.parametros.pessoa = pessoa;
      this.parametros.pessoa.id = this.pessoaService.idPessoa;
      this.anoAtual();
      this.listar();
    });
  }

  pesquisarHistorico() {
    this.pontoService.consultarPontoPeriodo(this.parametros).subscribe(dados => {
      this.registros = dados;
      this.calculaSaldo();
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

    this.parametros.dataIni = `${this.parametros.ano}-${('0' + (date.getMonth() + 1)).substr(-2)}-01`;
    this.parametros.dataFim = `${this.parametros.ano}-${('0' + ((date.getMonth() + 2) % 13)).substr(-2)}-01`;
  }

  calculaSaldo() {
    this.saldoTotal = 0;
    this.registros.forEach((element) => {
      this.saldoTotal += element.saldo;
    });
  }

  setNovoPonto() {
    this.horaUtil.setInputMask(document, 'salvarNovoPontoButton');
    this.dataUtil.setInputMask(document, 'salvarNovoPontoButton');
    this.resetNovoPonto();
  }

  resetNovoPonto() {
    this.novoPonto = {
      id: null,
      entrada: null,
      pausaini: null,
      pausafim: null,
      saida: null,
      dataRegistro: null
    }
  }

  salvarNovoPonto(ponto) {
    ponto.pessoa = this.parametros.pessoa;
    var pontoToSave = JSON.parse(JSON.stringify(ponto));

     pontoToSave.dataRegistro = this.dataUtil.newDateFromDate(pontoToSave.dataRegistro);

     for (var pAtributo in pontoToSave) {
      if (this.atributosPonto.indexOf(pAtributo) > -1) {
        if (pontoToSave[pAtributo]) {
          pontoToSave[pAtributo] = this.horaUtil.newDateFromHoraMin(pontoToSave[pAtributo]);
        }
      }
    }

    this.pontoService.salvarPonto(pontoToSave).subscribe((data) => {
      if(data) this.alertCreator.criarAlert('sucessoRegistroPonto', 'alertContainer');
      else this.alertCreator.criarAlert('erroRegistroPonto', 'alertContainer');
      this.listar();
    })
    
  }

  setPontoAtual(ponto: any) {
    this.horaUtil.setInputMask(document, 'salvarPontoButton')

    this.pontoAtual = JSON.parse(JSON.stringify(ponto));

    var datePipe = new DatePipe('pt-BR');

    for (var pAtributo in this.pontoAtual) {
      if (this.atributosPonto.indexOf(pAtributo) > - 1) {
        if (this.pontoAtual[pAtributo]) {
          this.pontoAtual[pAtributo] = datePipe.transform(this.pontoAtual[pAtributo], 'HH:mm');
        }

      }
    }

  }

  salvarPonto(ponto: any) {

    var pontoToSave = JSON.parse(JSON.stringify(ponto));

    for (var pAtributo in pontoToSave) {
      if (this.atributosPonto.indexOf(pAtributo) > - 1) {
        if (pontoToSave[pAtributo]) {
          pontoToSave[pAtributo] = this.horaUtil.newDateFromHoraMin(pontoToSave[pAtributo]);
        }
      }
    }
    this.pontoService.salvarPonto(pontoToSave).subscribe(() => {
      this.alertCreator.criarAlert('sucessoRegistroPonto', 'alertContainer');
      this.listar();
    });
  }
}
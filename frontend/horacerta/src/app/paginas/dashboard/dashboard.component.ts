import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { PontoService } from '../../servicos/ponto.service';
import { PessoaService } from '../../servicos/pessoa.service';
import { LIMITE_MINIMO_TAMANHO_HORA } from './../../app.api';
import { DatePipe } from '@angular/common';
import { AlertCreator } from '../../util/alert.util';
import { InputHora } from '../../util/input.hora.util';

@Component({
  selector: 'hr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[InputHora, AlertCreator]
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

  tamMinimo = LIMITE_MINIMO_TAMANHO_HORA;
  disablePontoButton = false;
  pontoDaVez;


  customPatterns = {
    '0': { pattern: new RegExp('[0-9-]+') }
  };

  horaAtual;
  dataAtual;
  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  atributosPonto = ['entrada', 'pausaini', 'pausafim', 'saida'];
  mes;
  constructor(
    private pontoService: PontoService,
    private pessoaService: PessoaService,
    private alertCreator: AlertCreator,
    private input: InputHora
  ) { }

  ngOnInit() {
    this.horaCerta();
    this.dataCerta();
    this.pessoaService.consultarPessoa().subscribe(pessoa => {
      this.parametros.pessoa = pessoa;
      this.parametros.pessoa.id = this.pessoaService.idPessoa;
      this.existeRegistroDia();
    });

    this.input.setInputMask(document, this.disablePontoButton);

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

  salvarPonto(ponto: any) {
    this.pontoService.salvarPonto(ponto).subscribe(() => {
      this.disablePontoButton = false;
      this.alertCreator.criarAlert('sucessoRegistroPonto', 'alertContainer');
      this.existeRegistroDia();
    });
  }

  existeRegistroDia() {
    const hoje = new Date();
    this.parametros.dataRegistro = hoje.getFullYear() + '-' + ('0' + (hoje.getMonth()+1)).substr(-2) + '-' + ('0' + (hoje.getDate())).substr(-2);;
    this.pontoService.consultarPonto(this.parametros).subscribe((p: any) => {

      if (p) {

        var datePipe = new DatePipe('pt-BR');

        for (var pAtributo in p) {
          if (this.atributosPonto.indexOf(pAtributo) > - 1) {
            if (p[pAtributo]) {
              p[pAtributo] = datePipe.transform(p[pAtributo], 'HH:mm');
            }
            else {
              this.pontoDaVez = pAtributo;
              this.parametros = JSON.parse(JSON.stringify(p));
              return;
            }
          }
        }
        this.disablePontoButton = true;
        this.parametros = JSON.parse(JSON.stringify(p));
      }
      else {
        this.pontoDaVez = 'entrada';
      }
    });
  }

  registrarPonto() {

    this.disablePontoButton = true;

    var pontoObj = JSON.parse(JSON.stringify(this.parametros));
    for (var pontoAtributo in pontoObj) {
      if (this.atributosPonto.indexOf(pontoAtributo) > -1) {
        if (pontoObj[pontoAtributo] && pontoObj[pontoAtributo].length > 0) {
          pontoObj[pontoAtributo] = this.input.newDateFromHoraMin(pontoObj[pontoAtributo], (pontoObj[pontoAtributo].indexOf(':') > -1 ? ':' : ''));
        }
        else {
          pontoObj[pontoAtributo] = new Date();
        }
        if(pontoAtributo == this.pontoDaVez){
          this.pontoDaVez = null;
          return this.salvarPonto(pontoObj);
        }
      }
    }
    this.pontoDaVez = null;
    return this.salvarPonto(pontoObj);
  }

}

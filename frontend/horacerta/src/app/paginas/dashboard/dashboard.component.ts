import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { PontoService } from '../../servicos/ponto.service';
import { PessoaService } from '../../servicos/pessoa.service';
import { LIMITE_MINIMO_TAMANHO_HORA } from './../../app.api';
import { DatePipe } from '@angular/common';

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

  tamMinimo = LIMITE_MINIMO_TAMANHO_HORA;

  customPatterns = {
    '0': { pattern: new RegExp('[0-9-]+') }
  };

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

    let pontoInputs = document.getElementsByClassName('inputHora');

    for (let i = 0; i < pontoInputs.length; i++) {

      pontoInputs[i].addEventListener('input', (e: any) => {
        var target = e.target;
        var position = target.selectionStart;

        var horaPonto = target.value;

        if (horaPonto.length < LIMITE_MINIMO_TAMANHO_HORA) {
          horaPonto = horaPonto + "-";
        }

        target.value = horaPonto;
        if (target.value.charAt(position - 1) == ':') {
          target.selectionEnd = position - 1;
        }

        else if(position == 5 && target.value.charAt(position-1).match(/^[0-9]+$/) == null) {
          target.selectionEnd = 0;
        }
        else if(position == 5 && target.value.charAt(position-1).match(/^[0-9]+$/) != null) {
          target.selectionEnd = 5;
        }
        else {
          target.selectionEnd = position;
        }
      })
    }

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
    this.parametros.dataRegistro = hoje.getFullYear() + '-' + ('0' + (hoje.getMonth())).substr(-2) + '-' + ('0' + (hoje.getDate())).substr(-2);;

    this.pontoService.consultarPonto(this.parametros).subscribe((p: any) => {

      if (p) {
        console.log(p);
        var datePipe = new DatePipe('pt-BR');
        p.entrada = datePipe.transform(p.entrada, 'HH:mm');
        p.pausaini = datePipe.transform(p.pausaini, 'HH:mm');
        p.pausafim = datePipe.transform(p.pausafim, 'HH:mm');
        p.saida = datePipe.transform(p.saida, 'HH:mm');
        this.parametros = p;
      }
    });
  }

  registrarPonto() {

    this.existeRegistroDia();

    switch (true) {
      case !this.parametros.entrada:
        this.parametros.entrada = (this.parametros.entrada ? this.newDateFromHoraMin(this.parametros.entrada) : new Date());
        this.salvarPonto();
        break;
      case !this.parametros.pausaini:
        this.parametros.pausaini = (this.parametros.pausaini ? this.newDateFromHoraMin(this.parametros.pausaini): new Date());
        this.salvarPonto();
        break;
      case !this.parametros.pausafim:
        this.parametros.pausafim = (this.parametros.pausafim ? this.newDateFromHoraMin(this.parametros.pausafim) : new Date());
        this.salvarPonto();
        break;
      case !this.parametros.saida:
        this.parametros.saida = (this.parametros.saida ? this.newDateFromHoraMin(this.parametros.saida) : new Date());
        this.salvarPonto();
        break;
      default:
        break;
    }
    console.log(this.parametros);
    // this.parametros.entrada = (this.parametros.entrada ? this.newDateFromHoraMin(this.parametros.entrada) : new Date());
    // this.parametros.pausaini = (this.parametros.pausaini ? this.newDateFromHoraMin(this.parametros.pausaini): new Date());
    // this.parametros.pausafim = (this.parametros.pausafim ? this.newDateFromHoraMin(this.parametros.pausafim) : new Date());
    // this.parametros.saida = (this.parametros.saida ? this.newDateFromHoraMin(this.parametros.saida) : new Date());
    // this.salvarPonto();

    this.existeRegistroDia();

  }

  newDateFromHoraMin(horaMinStr, separator?) {

    if(horaMinStr.length < 4) {
      return false;  
    }

    var str = horaMinStr.split(separator ? separator : '');
    var hora;
    var min;
    
    if(separator == null || separator == '') {
        hora = parseInt(str[0] + str[1]);
        min = parseInt(str[2] + str[3]);
    }
    else {
        hora = parseInt(str[0]);
        min = parseInt(str[1]);
    }

    if(hora > 23 || min > 59) {
        return false;
    }

    var ano = new Date().getFullYear();
    var mes = new Date().getMonth();
    var dia = new Date().getDate();
    var segundos = new Date().getSeconds();

    var data = new Date(ano, mes, dia, hora, min, segundos);
    return data.toString();
}

}

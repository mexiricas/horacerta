import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { PontoService } from '../../servicos/ponto.service';
import { PessoaService } from '../../servicos/pessoa.service';
import { LIMITE_MINIMO_TAMANHO_HORA } from './../../app.api';
import { DatePipe } from '@angular/common';
import { IfStmt } from '@angular/compiler';

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
  disablePontoButton = false;

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

        else if (position == 5 && target.value.charAt(position - 1).match(/^[0-9]+$/) == null) {
          target.selectionEnd = 0;
        }
        else if (position == 5 && target.value.charAt(position - 1).match(/^[0-9]+$/) != null) {
          target.selectionEnd = 5;
        }
        else {
          target.selectionEnd = position;
        }

        if (!this.newDateFromHoraMin(target.value, (target.value.indexOf(':') > -1 ? ':' : ''))) {
          target.classList.add("horaInvalida");
          this.disablePontoButton = true;
        }
        else {
          target.classList.remove("horaInvalida");
          if (document.getElementsByClassName("horaInvalida").length <= 0) {
            this.disablePontoButton = false;
          }
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

  salvarPonto(ponto: any) {
    this.pontoService.salvarPonto(ponto).subscribe(() => {
      this.criarAlert('sucessoRegistroPonto');
      this.existeRegistroDia();
    });
  }

  existeRegistroDia() {
    const hoje = new Date();
    this.parametros.dataRegistro = hoje.getFullYear() + '-' + ('0' + (hoje.getMonth())).substr(-2) + '-' + ('0' + (hoje.getDate())).substr(-2);;
    this.pontoService.consultarPonto(this.parametros).subscribe((p: any) => {

      if (p) {
        console.log(p);
        var datePipe = new DatePipe('pt-BR');

        if (p.entrada) p.entrada = datePipe.transform(p.entrada, 'HH:mm');
        if (p.pausaini) p.pausaini = datePipe.transform(p.pausaini, 'HH:mm');
        if (p.pausafim) p.pausafim = datePipe.transform(p.pausafim, 'HH:mm');
        if (p.saida) p.saida = datePipe.transform(p.saida, 'HH:mm');

        this.parametros = JSON.parse(JSON.stringify(p));

      }
    });
  }

  registrarPonto() {

    var pontoObj = JSON.parse(JSON.stringify(this.parametros));
    for (var pontoAtributo in pontoObj) {
      if (this.atributosPonto.indexOf(pontoAtributo) > -1) {
        if (!pontoObj[pontoAtributo]) {
          pontoObj[pontoAtributo] = new Date();
          return this.salvarPonto(pontoObj);
        }
        else {
          pontoObj[pontoAtributo] = this.newDateFromHoraMin(pontoObj[pontoAtributo], (pontoObj[pontoAtributo].indexOf(':') > -1 ? ':' : ''));
        }
      }
    }
    return this.salvarPonto(pontoObj);
  }

  newDateFromHoraMin(horaMinStr, separator?) {

    if (horaMinStr.length < 4) {
      return false;
    }

    var str = horaMinStr.split(separator ? separator : '');
    var hora;
    var min;

    if (separator == null || separator == '') {
      hora = parseInt(str[0] + str[1]);
      min = parseInt(str[2] + str[3]);
    }
    else {
      hora = parseInt(str[0]);
      min = parseInt(str[1]);
    }

    if (hora > 23 || min > 59) {
      return false;
    }

    var ano = new Date().getFullYear();
    var mes = new Date().getMonth();
    var dia = new Date().getDate();
    var segundos = new Date().getSeconds();

    var data = new Date(ano, mes, dia, hora, min, segundos);
    return data;
  }

  criarAlert(tipoAlert: String) {
    switch (tipoAlert) {
      case 'sucessoRegistroPonto':

        if (document.getElementById('alertContainer').childNodes.length <= 0) {
          var alert = document.createElement('DIV');
          var textoTitulo = document.createTextNode('Sucesso!');
          var texto = document.createTextNode('Ponto registrado com sucesso!');
          var textoBotao = document.createTextNode('x');

          alert.classList.add('alert');
          alert.classList.add('alert-success');
          alert.classList.add('alert-dismissible');
          
          var button = document.createElement('BUTTON');
          button.classList.add('close');
          button.setAttribute('data-dismiss', 'alert');
          button.setAttribute('aria-hidden', 'true');
          button.appendChild(textoBotao);
          
          var titulo = document.createElement('H4');
          
          var icon = document.createElement('I');
          icon.classList.add('icon');
          icon.classList.add('fa');
          icon.classList.add('fa-check');
          icon.appendChild(textoTitulo);
          
          titulo.appendChild(icon);
          
          alert.appendChild(button);
          alert.appendChild(titulo);
          alert.appendChild(texto);
          
          document.getElementById('alertContainer').appendChild(alert);
        }

    }
  }

}

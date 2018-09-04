import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  horaAtual;
  dataAtual;
  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  mes;
  constructor() { }

  ngOnInit() {
    this.horaCerta();
    this.dataCerta();
  }

  horaCerta(){
    setInterval(() => {
      this.horaAtual = ((new Date).toLocaleString().substr(11, 8));  
  }, 1000);
  }

  dataCerta(){
    const hoje = new Date();
    this.mes = (hoje.getMonth()) % 13;
    this.dataAtual = ('0' + (hoje.getDate())).substr(-2) + ' de ' + this.meses[this.mes] + ' de ' +  hoje.getFullYear();
  }
}

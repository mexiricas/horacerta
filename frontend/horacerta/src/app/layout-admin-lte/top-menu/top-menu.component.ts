import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../servicos/pessoa.service';

@Component({
  selector: 'hr-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  pessoa: any;

  constructor(private pessoaService: PessoaService) {
    this.pessoaService.consultarPessoa().subscribe((pessoa) => {
      this.pessoa = pessoa;
    });
   }

  ngOnInit() {
   
  }


}

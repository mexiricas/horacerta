import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../servicos/pessoa.service';

@Component({
  selector: 'hr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  pessoa: any;

  constructor(private pessoaService: PessoaService) {
    this.pessoaService.consultarPessoa().subscribe((pessoa) => {
      this.pessoa = pessoa;
    });
   }

  ngOnInit() {
    
  }

}

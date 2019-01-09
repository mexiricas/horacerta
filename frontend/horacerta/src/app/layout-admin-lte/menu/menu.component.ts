import { Component, OnInit } from '@angular/core';

import { PessoaService } from '../../servicos/pessoa.service';
import { TopMenuComponent } from '../top-menu/top-menu.component';

@Component({
  selector: 'hr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  pessoa: any;
  imagem: any;

  constructor(private pessoaService: PessoaService) {
    this.pessoaService.consultarPessoa().subscribe((pessoa) => {
      this.pessoa = pessoa;
      TopMenuComponent.emitImagem.subscribe((i) => {
        this.imagem = i;
      });
    });
   }

  ngOnInit() {
    
  }

}

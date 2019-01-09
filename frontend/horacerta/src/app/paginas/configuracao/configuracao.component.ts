import { Component, OnInit } from '@angular/core';

import { ConfiguracaoService } from './../../servicos/configuracao.service';

@Component({
  selector: 'hr-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit {

  pessoa: any = {};


  parametros: any = {
    senhaAtual: null,
    novaSenha: null,
    novaSenha_2: null,
    username: null
  }

  constructor(private configuracaoService: ConfiguracaoService) { }

  ngOnInit() {
    this.configuracaoService.consultarPessoa().subscribe((pessoa) => {
      this.pessoa = pessoa;
      this.pessoa.id = this.configuracaoService.getId();
      this.parametros.username = this.pessoa.username;
      //console.log(pessoa);
    });
  }

  salvarPessoa() {
    this.configuracaoService.salvarPessoa(this.pessoa).subscribe((p) => {
      // this.pessoa = p;
      console.log(p);
      
     });
  }

  trocarSenha() {
    console.log(this.parametros);
    
    this.configuracaoService.novaSenha(this.parametros).subscribe(retorno =>{
      if(retorno === true && this.parametros.novaSenha === this.parametros.novaSenha_2){
        this.parametros = {};
        console.log("A sua senha foi alterada com sucesso!");
      }else{
        console.log("Não foi possivel mudar a senha!");
        
      }
    });
  }

}

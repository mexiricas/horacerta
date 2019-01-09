import { Component, OnInit } from '@angular/core';

import { ConfiguracaoService } from './../../servicos/configuracao.service';
import { MensagemService } from './../../componentes/mensagem/mensagem.service';


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

  constructor(
    private configuracaoService: ConfiguracaoService,
    private mensagemService: MensagemService) { }

  ngOnInit() {
    this.configuracaoService.consultarPessoa().subscribe((pessoa) => {
      this.pessoa = pessoa;
      this.pessoa.id = this.configuracaoService.getId();
      this.parametros.username = this.pessoa.username;
    });
  }

  salvarPessoa() {
    this.configuracaoService.salvarPessoa(this.pessoa).subscribe(() => {});
  }

  trocarSenha() {
    this.configuracaoService.novaSenha(this.parametros).subscribe(retorno =>{
      if(retorno === true && this.parametros.novaSenha === this.parametros.novaSenha_2){
        this.parametros = {};
        this.sucesso(`${this.pessoa.nome}, sua senha foi alterada com sucesso!`);
      }else{
        this.erro(`${this.pessoa.nome}, as senhas informadas não são iguais, certifique-se e tente novamente!`);
      }
    });
  }

  sucesso(message: string) {
    this.mensagemService.sucesso(message);
  }


  erro(message: string) {
    this.mensagemService.erro(message);
  }

}

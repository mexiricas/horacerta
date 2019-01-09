import { isDevMode, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie';

import { HR_API, TEST_USER_ID } from './../app.api';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {

  public idPessoa: any;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient) { }

  ngOnInit() { }

  getId() {
    return this.idPessoa;
  }

  consultarPessoa() {
    if (!isDevMode()) {
      this.idPessoa = this.cookieService.get('idPessoa');
    }
    else {
      this.idPessoa = TEST_USER_ID;
    }
    return this.http.get(`${HR_API}/pessoas/${this.idPessoa}`);
  }

  salvarPessoa(pessoa) {
    return this.http.post(`${HR_API}/configuracao/salvar/pessoa`, pessoa);
  }

  confirmarSenha(parametros) { 
    return this.http.post(`${HR_API}/configuracao/confirmar/novasenha`, parametros);
  }

  novaSenha(parametros) { 
    return this.http.post(`${HR_API}/configuracao/salvar/novasenha`, parametros);
  }

  salvarImagem(parametros){
    return this.http.post(`${HR_API}/configuracao/salvar/imagem`, parametros);
  }

  montarImagem(parametros){
    return this.http.post(`${HR_API}/configuracao/montar/imagem`, parametros);
  }
  
}

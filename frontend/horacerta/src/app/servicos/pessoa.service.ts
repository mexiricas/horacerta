import { isDevMode } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie';

import { HR_API } from './../app.api';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  
  public idPessoa: any;

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit() {
  }

  consultarPessoa() {
    if(!isDevMode()){
      this.idPessoa = this.cookieService.get('idPessoa');
    }
    else {
      this.idPessoa = 5;
    }
    return this.http.get(`${HR_API}/pessoas/${this.idPessoa}`);
  }


}

import { isDevMode } from '@angular/core';
import { HR_API } from './../app.api';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';

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
      this.idPessoa = 1;
    }
    return this.http.get(`${HR_API}/pessoas/${this.idPessoa}`);
  }


}

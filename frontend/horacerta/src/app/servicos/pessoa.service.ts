import { HR_API } from './../app.api';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  
  public idPessoa: any = 1;

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit() {
    // this.idPessoa = this.cookieService.get('idPessoa');
  }

  consultarPessoa() {
    return this.http.get(`${HR_API}/pessoas/${this.idPessoa}`);
  }


}

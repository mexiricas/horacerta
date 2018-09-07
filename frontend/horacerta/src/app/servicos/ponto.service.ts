import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HR_API } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class PontoService {

  constructor(private http: HttpClient) { }

  listar(parametros) {
    return this.http.post(`${HR_API}/ponto/listagem`, parametros);
  }

  consultarPonto(parametros){
    return this.http.post(`${HR_API}/consultar/ponto`, parametros);
  }





}

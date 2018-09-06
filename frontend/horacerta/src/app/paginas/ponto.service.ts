import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PontoService {

  constructor(private http: HttpClient) { }

  listar(filters) {
    return this.http.post(`http://localhost:8080/ponto/listagem`,filters)
  }





}

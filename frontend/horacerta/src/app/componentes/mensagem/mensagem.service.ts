import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Mensagem, EnumAlerta } from './mensagem';


@Injectable()
export class MensagemService {

  private subject = new Subject<Mensagem>();
  private manterRotaAposAlteracao = false;

  constructor(private router: Router) {
    router.events.subscribe(evento => {
      if (this.manterRotaAposAlteracao) {
        this.manterRotaAposAlteracao = false;
      } else {
        this.limparMensagem(18000);
      }
    })
  }

  getMensagem(): Observable<any> {
    return this.subject.asObservable();
  }

  sucesso(mensagem: string, manterRotaAposAlteracao = false) {
    this.mensagem(EnumAlerta.sucesso, mensagem, manterRotaAposAlteracao);
  }

  erro(mensagem: string, manterRotaAposAlteracao = false) {
    this.mensagem(EnumAlerta.erro, mensagem, manterRotaAposAlteracao);
  }

  info(mensagem: string, manterRotaAposAlteracao = false) {
    this.mensagem(EnumAlerta.info, mensagem, manterRotaAposAlteracao);
  }

  alerta(mensagem: string, manterRotaAposAlteracao = false) {
    this.mensagem(EnumAlerta.alerta, mensagem, manterRotaAposAlteracao);
  }

  mensagem(tipo: EnumAlerta, msg: string, manterRotaAposAlteracao = false) {
    this.manterRotaAposAlteracao = manterRotaAposAlteracao;
    this.subject.next(<Mensagem>{ tipo: tipo, mensagem: msg });
  }

  limparMensagem(tempo) {
    setTimeout(() => {
      this.subject.next();
    }, tempo);
  }

}

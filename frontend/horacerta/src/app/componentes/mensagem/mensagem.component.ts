import { Component, OnInit } from '@angular/core';

import { Mensagem, EnumAlerta } from './mensagem';
import { MensagemService } from './mensagem.service';

@Component({
  selector: 'hr-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {
  mensagens: Mensagem[] = []

  constructor(private mensagemService: MensagemService) { }

  ngOnInit() {
    this.mensagemService.getMensagem().subscribe((msg: Mensagem) => {
      if (!msg) {
        this.mensagens = [];
        return;
      }
      this.mensagens.push(msg);
    });
  }

  removendoMensagens(msg: Mensagem) {
    this.mensagens = this.mensagens.filter(x => x !== msg);
  }

  cssClass(msg: Mensagem) {
    if (!msg) {
      return;
    }

    switch (msg.tipo) {
      case EnumAlerta.sucesso:
        return 'alert alert-success';
      case EnumAlerta.erro:
        return 'alert alert-danger';
      case EnumAlerta.info:
        return 'alert alert-info';
      case EnumAlerta.alerta:
        return 'alert alert-warning';
    }
  }

}

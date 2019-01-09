import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';

import { ConfiguracaoService } from './../../servicos/configuracao.service';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'hr-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  pessoa: any;
  imagem: any;
  username: any;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  static emitImagem = new EventEmitter();

  //@ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  constructor(private configuracaoService: ConfiguracaoService) {
    this.configuracaoService.consultarPessoa().subscribe((pessoa) => {
      this.pessoa = pessoa;
      this.username = this.pessoa.username;
      this.configuracaoService.montarImagem({ username: this.username }).subscribe(i => {
        this.imagem = i["base64"];
        TopMenuComponent.emitImagem.emit(this.imagem);
        // console.log(i["base64"]); 

      });
    });
  }

  ngOnInit() {
    //this.minhaImg();

  }

  minhaImg() {
    this.imagem = this.croppedImage;
    this.configuracaoService.salvarImagem({ imagem: this.imagem, username: this.username }).subscribe(() => {
      TopMenuComponent.emitImagem.emit(this.imagem);
      this.imageChangedEvent = '';
      this.croppedImage = '';
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  loadImageFailed() {
    // show message
  }
}

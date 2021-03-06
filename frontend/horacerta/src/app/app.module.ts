import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { MenuComponent } from './layout-admin-lte/menu/menu.component';
import { TopMenuComponent } from './layout-admin-lte/top-menu/top-menu.component';
import { CorpoComponent } from './layout-admin-lte/corpo/corpo.component';
import { routing } from './app.router';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { HistoricoComponent } from './paginas/historico/historico.component';
import { PontoService } from './servicos/ponto.service';
import { CookieModule } from 'ngx-cookie';
import {NgxMaskModule} from 'ngx-mask';
import { PaginarComponent } from './componentes/paginar/paginar.component';
import { NomeUsuarioPipe } from './pipes/nome-usuario.pipe';
import { registerLocaleData } from '@angular/common';
import { SaldoPipe } from './pipes/saldo.pipe';
import { RodapeComponent } from './layout-admin-lte/rodape/rodape.component';
import { ConfiguracaoComponent } from './paginas/configuracao/configuracao.component';
import { EFonePipe } from './pipes/e-fone.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';
import { MensagemService } from './componentes/mensagem/mensagem.service';

registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TopMenuComponent,
    CorpoComponent,
    DashboardComponent,
    HistoricoComponent,
    PaginarComponent,
    NomeUsuarioPipe,
    SaldoPipe,
    RodapeComponent,
    ConfiguracaoComponent,
    EFonePipe,
    MensagemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    CookieModule.forRoot(),
    NgxMaskModule.forRoot(),
    ImageCropperModule
  ],
  providers: [PontoService, {provide: LOCALE_ID, useValue: 'pt-BR'}, MensagemService],
  bootstrap: [AppComponent]
})
export class AppModule { }

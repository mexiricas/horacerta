import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './layout-admin-lte/menu/menu.component';
import { TopMenuComponent } from './layout-admin-lte/top-menu/top-menu.component';
import { CorpoComponent } from './layout-admin-lte/corpo/corpo.component';
import { routing } from './app.router';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { HistoricoComponent } from './paginas/historico/historico.component';
import { PontoService } from './servicos/ponto.service';
import { CookieModule } from 'ngx-cookie';
import { PaginarComponent } from './componentes/paginar/paginar.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TopMenuComponent,
    CorpoComponent,
    DashboardComponent,
    HistoricoComponent,
    PaginarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    CookieModule.forRoot()
  ],
  providers: [PontoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

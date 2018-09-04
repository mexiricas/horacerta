import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './layout-admin-lte/menu/menu.component';
import { TopMenuComponent } from './layout-admin-lte/top-menu/top-menu.component';
import { CorpoComponent } from './layout-admin-lte/corpo/corpo.component';
import { routing } from './app.router';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TopMenuComponent,
    CorpoComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

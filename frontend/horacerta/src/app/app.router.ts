import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core/';

import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { HistoricoComponent } from './paginas/historico/historico.component';
import { ConfiguracaoComponent } from './paginas/configuracao/configuracao.component';

const APP_ROUTES: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'historico', component: HistoricoComponent},
    {path: 'editar/perfil', component: ConfiguracaoComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});
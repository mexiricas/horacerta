import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core/';

import { DashboardComponent } from './paginas/dashboard/dashboard.component';

const APP_ROUTES: Routes = [
    {path: '', component: DashboardComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});
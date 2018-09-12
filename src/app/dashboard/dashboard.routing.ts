import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ControlesDocumentacionComponent } from '../documentacion/controles-documentacion/controles-documentacion.component';


export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent 
  }
];

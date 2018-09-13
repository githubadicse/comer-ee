import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotivoIngresoMainComponent } from './motivo-ingreso-main/motivo-ingreso-main.component';
import { MotivoIngresoGridComponent } from './motivo-ingreso-grid/motivo-ingreso-grid.component';
import { MotivoIngresoEditComponent } from './motivo-ingreso-edit/motivo-ingreso-edit.component';

const routes: Routes = [
  {
    path: 'main',
    component: MotivoIngresoMainComponent,
    children: [
      {
        path: '', component: MotivoIngresoGridComponent, outlet: 'outlet-motivo-ingreso-grid'
      },
      {
        path: 'motivo-ingreso-edit', component: MotivoIngresoEditComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotivoIngresoRoutingModule { }

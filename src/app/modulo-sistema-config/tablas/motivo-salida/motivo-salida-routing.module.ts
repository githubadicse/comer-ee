import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotivoSalidaMainComponent } from './motivo-salida-main/motivo-salida-main.component';
import { MotivoSalidaGridComponent } from './motivo-salida-grid/motivo-salida-grid.component';
import { MotivoSalidaEditComponent } from './motivo-salida-edit/motivo-salida-edit.component';


const routes: Routes = [
  {
    path: 'main',
    component: MotivoSalidaMainComponent,
    children: [
      {
        path: '', component: MotivoSalidaGridComponent, outlet: 'outlet-motivo-salida-grid'
      },
      {
        path: 'motivo-salida-edit', component: MotivoSalidaEditComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotivoSalidaRoutingModule { }

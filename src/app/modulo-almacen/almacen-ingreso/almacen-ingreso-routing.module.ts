import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenIngresoMainComponent } from './almacen-ingreso-main/almacen-ingreso-main.component';

const routes: Routes = [
{

    path: '',
    component: AlmacenIngresoMainComponent

  },

  {
    path: '**', component: AlmacenIngresoMainComponent
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenIngresoRoutingModule { }

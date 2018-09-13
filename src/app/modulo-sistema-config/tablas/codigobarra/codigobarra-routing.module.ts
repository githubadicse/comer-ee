import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodigobarraComponent } from './codigobarra.component';

const routes: Routes = [

  {
    path : '',
    component : CodigobarraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodigobarraRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenIngresoMainComponent } from './almacen-ingreso-main/almacen-ingreso-main.component';
import { AlmacenIngresoEdicionComponent } from './almacen-ingreso-edicion/almacen-ingreso-edicion.component';
import { AlmacenIngresoListaComponent } from './almacen-ingreso-lista/almacen-ingreso-lista.component';

// const routes: Routes = [
// {

//     path: '',
//     component: AlmacenIngresoMainComponent
//   },
//   {
//     path: '**', component: AlmacenIngresoMainComponent
//   }

// ];

const routes: Routes = [
  {
    path : '', component : AlmacenIngresoMainComponent,

    children : [
      {
        path : '', redirectTo : 'lista'
      },
      {
        path : 'lista', component : AlmacenIngresoListaComponent,
        children : [
          {
            path : 'edicion' , component : AlmacenIngresoEdicionComponent
          }
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenIngresoRoutingModule { }

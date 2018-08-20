import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoComponent } from './producto/producto.component';
import { ProductodetalleComponent } from './productodetalle/productodetalle.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: '', component: MainComponent,

    children: [
      {
        path: '', redirectTo: 'lista'
      },
      {
        path: 'lista', component: ProductoComponent,
        children: [
          {
            path: 'edicion', component: ProductodetalleComponent
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
export class ProductoRoutingModule { }

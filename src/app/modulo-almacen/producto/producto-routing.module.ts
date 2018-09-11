import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoComponent } from './producto/producto.component';
import { ProductodetalleComponent } from './productodetalle/productodetalle.component';
import { MainComponent } from './main/main.component';
import { MarcaArticuloEditarComponent } from '../marca-articulo/marca-articulo-editar/marca-articulo-editar.component';
import { CategoriaArticuloEditarComponent } from '../categoria-articulo/categoria-articulo-editar/categoria-articulo-editar.component';


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
            path: 'edicion', component: ProductodetalleComponent,
            children: [
              {
                path: 'marca', component: MarcaArticuloEditarComponent
              },
              {
                path: 'categoria', component: CategoriaArticuloEditarComponent
              }
            ]
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

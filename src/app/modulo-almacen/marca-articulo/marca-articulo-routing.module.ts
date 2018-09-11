import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcaArticuloMainComponent } from './marca-articulo-main/marca-articulo-main.component';
import { MarcaArticuloListaComponent } from './marca-articulo-lista/marca-articulo-lista.component';
import { MarcaArticuloEditarComponent } from './marca-articulo-editar/marca-articulo-editar.component';

const routes: Routes = [{
  path : '' , component : MarcaArticuloMainComponent,
  children : [
    {
      path : '' , redirectTo : 'lista'

    },
    {
      path : 'lista' , component : MarcaArticuloListaComponent,

      children : [
        {
          path : 'edicion', component : MarcaArticuloEditarComponent
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcaArticuloRoutingModule { }

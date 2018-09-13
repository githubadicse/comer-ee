import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadmedidaMainComponent } from './unidadmedida-main/unidadmedida-main.component';
import { UnidadmedidaListaComponent } from './unidadmedida-lista/unidadmedida-lista.component';
import { UnidadmedidaEditarComponent } from './unidadmedida-editar/unidadmedida-editar.component';

const routes: Routes = [
  {
    path : 'main', component : UnidadmedidaMainComponent,
    children : [
      {
        path : '', redirectTo : 'lista'
      },
      {
        path : 'lista', component : UnidadmedidaListaComponent,
        children : [
          {
            path : 'edicion' , component : UnidadmedidaEditarComponent
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
export class UnidadmedidaRoutingModule { }

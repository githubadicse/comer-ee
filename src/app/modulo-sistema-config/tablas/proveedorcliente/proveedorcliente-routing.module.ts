import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProveedorclienteMainComponent } from './proveedorcliente-main/proveedorcliente-main.component';
import { ProveedorclienteListaComponent } from './proveedorcliente-lista/proveedorcliente-lista.component';
import { ProveedorclienteEdicionComponent } from './proveedorcliente-edicion/proveedorcliente-edicion.component';

const routes: Routes = [
  {

    path: 'main',
    component: ProveedorclienteMainComponent,
    children: [
      {
        path: '', redirectTo : 'lista'
      },
      {
        path : 'lista', component : ProveedorclienteListaComponent,

        children : [
          {
            path : 'edicion', component : ProveedorclienteEdicionComponent
          }
        ]
      }
   
  
    ]


  },

  {
    path: '**', component: ProveedorclienteMainComponent
  }



];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorclienteRoutingModule { }

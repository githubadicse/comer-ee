import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenMainComponent } from './almacen-main/almacen-main.component';
import { AlmacenListaComponent } from './almacen-lista/almacen-lista.component';
import { AlmacenEdicionComponent } from './almacen-edicion/almacen-edicion.component';


const routes: Routes = [
 {

    path: 'main',
    component: AlmacenMainComponent,
    children: [
      {
        path: '', redirectTo : 'lista'
      },
      {
        path: 'lista', component: AlmacenListaComponent,

        children : [
          {
            path : 'edicion', component : AlmacenEdicionComponent
          }
        ]
      }
  
    ]


  },

  {
    path: '**', component: AlmacenMainComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }

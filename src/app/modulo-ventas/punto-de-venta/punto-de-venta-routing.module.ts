import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ListaComponent } from './lista/lista.component';
import { EditComponent } from './edit/edit.component';



const routes: Routes = [
  {
    path : '' , component : MainComponent,
    children : [
      {
        path : '' , redirectTo : 'venta'
      },
      {
        path : 'venta' , component : EditComponent
      },
      {
        path : 'lista' , component : ListaComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuntoDeVentaRoutingModule { }

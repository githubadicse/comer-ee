import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AperturaPeriodoComponent } from './apertura-periodo/apertura-periodo.component';
import { CerrarPeriodoComponent } from './cerrar-periodo/cerrar-periodo.component';
import { InicioOperacionesComponent } from './inicio-operaciones/inicio-operaciones.component';
import { PeriodoalmacenOpcionesComponent } from './periodoalmacen-opciones/periodoalmacen-opciones.component';
import { PeriodoalmacenMainComponent } from './periodoalmacen-main/periodoalmacen-main.component';


const routes: Routes = [{
  path: '', component: PeriodoalmacenMainComponent,
  children: [{
    path: '', component: PeriodoalmacenOpcionesComponent,
    
  },
  {
    path: 'inicio' , component: InicioOperacionesComponent
  }
  ,
  {
    path: 'cierre' , component: CerrarPeriodoComponent
  },

  {
    path: 'apertura' , component: AperturaPeriodoComponent
  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodoalmacenRoutingModule { }

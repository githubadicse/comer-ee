import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainProcesosComponent } from './main-procesos/main-procesos.component';
import { CargarInfoMainComponent } from './cargar-info/cargar-info-main/cargar-info-main.component';
import { CalcularVolumenMainComponent } from './calcular-volumen/calcular-volumen-main/calcular-volumen-main.component';
import { GenerarExcelMainComponent } from './generar-excel/generar-excel-main/generar-excel-main.component';
import { EliminarCalculoMainComponent } from './eliminar-calculo/eliminar-calculo-main/eliminar-calculo-main.component';
import { GenerarGuiasMainComponent } from './generar-guias/generar-guias-main/generar-guias-main.component';

const routes: Routes = [
  {
    path : '', component : MainProcesosComponent,
    children : [{
      path : 'cargar-info', component : CargarInfoMainComponent
    },{
      path : 'procesar-calculo', component : CalcularVolumenMainComponent
    },
    {
      path : 'generar-xls-volumen', component : GenerarExcelMainComponent
    },
    {
      path : 'eliminar-calculo', component : EliminarCalculoMainComponent
    }    ,
    {
      path : 'generar-guia', component : GenerarGuiasMainComponent
    }        
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule { }

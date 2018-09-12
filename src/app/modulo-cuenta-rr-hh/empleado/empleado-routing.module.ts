import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadoMainComponent } from './empleado-main/empleado-main.component';
import { EmpleadoGridComponent } from './empleado-grid/empleado-grid.component';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';


const routes: Routes = [{
  path : '' , component : EmpleadoMainComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }

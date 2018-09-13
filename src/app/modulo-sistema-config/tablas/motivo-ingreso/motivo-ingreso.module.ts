import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotivoIngresoRoutingModule } from './motivo-ingreso-routing.module';
import { MotivoIngresoMainComponent } from './motivo-ingreso-main/motivo-ingreso-main.component';
import { MotivoIngresoGridComponent } from './motivo-ingreso-grid/motivo-ingreso-grid.component';
import { MotivoIngresoEditComponent } from './motivo-ingreso-edit/motivo-ingreso-edit.component';
import { GrowlModule, DataTableModule, AutoCompleteModule } from "primeng/primeng";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';




@NgModule({
  imports: [
    CommonModule,
    MotivoIngresoRoutingModule,
    GrowlModule,
    DataTableModule,    
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule  
  ],
  declarations: [MotivoIngresoMainComponent, MotivoIngresoGridComponent, MotivoIngresoEditComponent]
})
export class MotivoIngresoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotivoSalidaRoutingModule } from './motivo-salida-routing.module';
import { MotivoSalidaGridComponent } from './motivo-salida-grid/motivo-salida-grid.component';
import { MotivoSalidaEditComponent } from './motivo-salida-edit/motivo-salida-edit.component';
import { MotivoSalidaMainComponent } from './motivo-salida-main/motivo-salida-main.component';
import { GrowlModule, DataTableModule, AutoCompleteModule } from "primeng/primeng";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    MotivoSalidaRoutingModule,
    GrowlModule,
    DataTableModule,    
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule  
  ],
  declarations: [MotivoSalidaGridComponent, MotivoSalidaEditComponent, MotivoSalidaMainComponent]
})
export class MotivoSalidaModule { }

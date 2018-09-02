import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoGridComponent } from './empleado-grid/empleado-grid.component';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { EmpleadoMainComponent } from './empleado-main/empleado-main.component';
import { GrowlModule, DataTableModule, FileUploadModule, ConfirmDialogModule } from 'primeng/primeng';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ConfirmDialogModule,
    MatTableModule

  ],
  declarations: [EmpleadoGridComponent, EmpleadoEditComponent, EmpleadoMainComponent]
})
export class EmpleadoModule { }

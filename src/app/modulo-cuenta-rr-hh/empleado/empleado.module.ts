import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoGridComponent } from './empleado-grid/empleado-grid.component';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { EmpleadoMainComponent } from './empleado-main/empleado-main.component';
import { GrowlModule, DataTableModule, FileUploadModule, ConfirmDialogModule } from 'primeng/primeng';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ComponentesModule } from '../../componentes/componentes.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ComponentesModule,
    MatSlideToggleModule


  ],
  declarations: [EmpleadoGridComponent, EmpleadoEditComponent, EmpleadoMainComponent]
})
export class EmpleadoModule { }

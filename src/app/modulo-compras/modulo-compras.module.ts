import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloComprasRoutingModule } from './modulo-compras-routing.module';
import { ComprasMainComponent } from './compras-main/compras-main.component';
import { ComprasListComponent } from './compras-list/compras-list.component';
import { ComprasEditComponent } from './compras-edit/compras-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSortModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatDialogModule, MatSelectModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { ComponentesModule } from '../componentes/componentes.module';


import { AlmacenIngresoModule } from '../modulo-almacen/almacen-ingreso/almacen-ingreso.module';
import { ComprasEditDialogComponent } from './compras-edit/compras-edit-dialog/compras-edit-dialog.component';
import { DataTableModule } from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    ModuloComprasRoutingModule,
    
    DataTableModule,

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule,
    MatSortModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule ,
    MatSelectModule,
    MatDialogModule,     

    AlmacenIngresoModule
  ],
  declarations: [
    ComprasMainComponent, 
    ComprasListComponent, 
    ComprasEditComponent, 
    ComprasEditDialogComponent,
  ],
  entryComponents:[ComprasEditDialogComponent]  
})
export class ModuloComprasModule { }

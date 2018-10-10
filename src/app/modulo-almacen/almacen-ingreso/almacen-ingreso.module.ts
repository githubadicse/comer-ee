import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenIngresoRoutingModule } from './almacen-ingreso-routing.module';
import { AlmacenIngresoMainComponent } from './almacen-ingreso-main/almacen-ingreso-main.component';
import { AlmacenIngresoEdicionComponent } from './almacen-ingreso-edicion/almacen-ingreso-edicion.component';
import { AlmacenIngresoListaComponent } from './almacen-ingreso-lista/almacen-ingreso-lista.component';
import { GrowlModule, DataTableModule, AutoCompleteModule, CalendarModule, MessagesModule } from "primeng/primeng";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { KardexModule } from '../kardex/kardex.module';
import { SharedModule } from '../../shared/shared.module';
import { MatSortModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { ComponentesModule } from '../../componentes/componentes.module';
import { AlmacenIngresoEdicionDialogComponent } from './almacen-ingreso-edicion/almacen-ingreso-edicion-dialog/almacen-ingreso-edicion-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    AlmacenIngresoRoutingModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule,
    MessagesModule,
    KardexModule,
    ComponentesModule,
    MatSortModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule ,
    MatSelectModule,
    MatDialogModule,

  ],
  declarations: [
    AlmacenIngresoMainComponent, 
    AlmacenIngresoEdicionComponent, 
    AlmacenIngresoListaComponent, 
    AlmacenIngresoEdicionDialogComponent
  ],
  exports: [
    AlmacenIngresoListaComponent,
    AlmacenIngresoEdicionComponent,
    AlmacenIngresoEdicionDialogComponent
  ],
  entryComponents: [AlmacenIngresoEdicionDialogComponent]
})
export class AlmacenIngresoModule { }

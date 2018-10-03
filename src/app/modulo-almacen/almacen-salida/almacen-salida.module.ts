import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenSalidaRoutingModule } from './almacen-salida-routing.module';
import { AlmacenSalidaMainComponent } from './almacen-salida-main/almacen-salida-main.component';
import { AlmacenSalidaEdicionComponent } from './almacen-salida-edicion/almacen-salida-edicion.component';
import { AlmacenSalidaListaComponent } from './almacen-salida-lista/almacen-salida-lista.component';
import { GrowlModule, DataTableModule, AutoCompleteModule, CalendarModule, MessagesModule } from 'primeng/primeng';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { KardexModule } from '../kardex/kardex.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { MatSortModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { AlmacenSalidaEdicionDialogComponent } from './almacen-salida-edicion/almacen-salida-edicion-dialog/almacen-salida-edicion-dialog.component';



@NgModule({
  imports: [
    CommonModule,
    AlmacenSalidaRoutingModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule,
    MessagesModule,
    KardexModule,
    HttpClientModule,
    ComponentesModule,
    MatSortModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule ,
    MatSelectModule,
    MatDialogModule 
  ],
  declarations: [
    AlmacenSalidaMainComponent, 
    AlmacenSalidaEdicionComponent, 
    AlmacenSalidaListaComponent, AlmacenSalidaEdicionDialogComponent
  ],
  entryComponents: [AlmacenSalidaEdicionDialogComponent]
})
export class AlmacenSalidaModule { }

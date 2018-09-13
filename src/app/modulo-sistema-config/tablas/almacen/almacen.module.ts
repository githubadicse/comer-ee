import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenMainComponent } from './almacen-main/almacen-main.component';
import { AlmacenListaComponent } from './almacen-lista/almacen-lista.component';
import { AlmacenEdicionComponent } from './almacen-edicion/almacen-edicion.component';
import { GrowlModule, DataTableModule, AutoCompleteModule, ConfirmDialogModule } from "primeng/primeng";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ConfirmDialogModule,

  ],
  declarations: [AlmacenMainComponent, AlmacenListaComponent, AlmacenEdicionComponent]
})
export class AlmacenModule { }

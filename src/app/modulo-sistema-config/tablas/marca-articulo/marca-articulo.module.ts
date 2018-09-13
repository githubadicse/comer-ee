import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcaArticuloRoutingModule } from './marca-articulo-routing.module';
import { MarcaArticuloEditarComponent } from './marca-articulo-editar/marca-articulo-editar.component';
import { MarcaArticuloListaComponent } from './marca-articulo-lista/marca-articulo-lista.component';
import { MarcaArticuloMainComponent } from './marca-articulo-main/marca-articulo-main.component';
import { GrowlModule, DataTableModule, ConfirmDialogModule } from 'primeng/primeng';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {  HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    MarcaArticuloRoutingModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    HttpClientModule
  ],
  declarations: [MarcaArticuloEditarComponent, MarcaArticuloListaComponent, MarcaArticuloMainComponent]
})
export class MarcaArticuloModule { }

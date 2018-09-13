import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadmedidaRoutingModule } from './unidadmedida-routing.module';
import { UnidadmedidaMainComponent } from './unidadmedida-main/unidadmedida-main.component';
import { UnidadmedidaListaComponent } from './unidadmedida-lista/unidadmedida-lista.component';
import { UnidadmedidaEditarComponent } from './unidadmedida-editar/unidadmedida-editar.component';
import { GrowlModule, DataTableModule, ConfirmDialogModule } from 'primeng/primeng';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UnidadmedidaRoutingModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
  declarations: [UnidadmedidaMainComponent, UnidadmedidaListaComponent, UnidadmedidaEditarComponent]
})
export class UnidadmedidaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloComprasRoutingModule } from './modulo-compras-routing.module';
import { ComprasMainComponent } from './compras-main/compras-main.component';
import { ComprasListComponent } from './compras-list/compras-list.component';
import { ComprasEditComponent } from './compras-edit/compras-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../componentes/componentes.module';
import { MatSortModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatSelectModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ModuloComprasRoutingModule,

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule,
    MatSortModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule ,
    MatSelectModule,
    MatDialogModule     
  ],
  declarations: [ComprasMainComponent, ComprasListComponent, ComprasEditComponent]
})
export class ModuloComprasModule { }

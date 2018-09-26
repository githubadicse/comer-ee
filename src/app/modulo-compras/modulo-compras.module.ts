import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloComprasRoutingModule } from './modulo-compras-routing.module';
import { ComprasMainComponent } from './compras-main/compras-main.component';
import { ComprasListComponent } from './compras-list/compras-list.component';
import { ComprasEditComponent } from './compras-edit/compras-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ModuloComprasRoutingModule
  ],
  declarations: [ComprasMainComponent, ComprasListComponent, ComprasEditComponent]
})
export class ModuloComprasModule { }

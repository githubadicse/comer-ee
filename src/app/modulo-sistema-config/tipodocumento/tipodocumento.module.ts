import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipodocumentoRoutingModule } from './tipodocumento-routing.module';
import { TipodocumentoGridComponent } from './tipodocumento-grid/tipodocumento-grid.component';
import { TipodocumentoEditComponent } from './tipodocumento-edit/tipodocumento-edit.component';
import { TipodocumentoMainComponent } from './tipodocumento-main/tipodocumento-main.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { GrowlModule, DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

//material
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TipodocumentoRoutingModule,
    TableModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [TipodocumentoGridComponent, TipodocumentoEditComponent, TipodocumentoMainComponent]
})
export class TipodocumentoModule { }
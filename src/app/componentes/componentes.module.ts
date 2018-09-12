import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompFindAlmacenComponent } from './comp-find-almacen/comp-find-almacen.component';
import { CompFindCodigoBarraComponent } from './comp-find-codigo-barra/comp-find-codigo-barra.component';

import { MatProgressBarModule, MatProgressBar } from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material';

import { FechaMatComponent } from './fecha-mat/fecha-mat.component';
import { MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MOMENT_DATE_FORMATS, MomentDateAdapter } from '../shared/validators/MomentDateAdapter';

import { CompFindCodigoBarraModule } from './comp-find-codigo-barra/comp-find-codigo-barra.module';
import { CompTipoDocumentoIdentidadComponent } from './comp-tipo-documento-identidad/comp-tipo-documento-identidad.component';
import { CompFindProveedorClienteRucComponent } from './comp-find-proveedor-cliente-ruc/comp-find-proveedor-cliente-ruc.component';
import { CompFindMedioPagoComponent } from './comp-find-medio-pago/comp-find-medio-pago.component';
import { CompFindProductoComponent } from './comp-find-producto/comp-find-producto.component';
import { PaginatorModule } from 'primeng/paginator';
import { CompFindProductoListComponent } from './comp-find-producto-list/comp-find-producto-list.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    CompFindCodigoBarraModule
  ],
  providers : [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter }
  ],

  exports : [MatDatepickerModule,CompFindAlmacenComponent,FechaMatComponent],

  declarations: [
    FechaMatComponent,
    CompFindAlmacenComponent, 
    CompTipoDocumentoIdentidadComponent, 
    CompFindProveedorClienteRucComponent, 
    CompFindMedioPagoComponent, 
    CompFindProductoComponent, CompFindProductoListComponent
  ],
  exports: [MatDatepickerModule,FechaMatComponent,CompFindAlmacenComponent, CompTipoDocumentoIdentidadComponent, CompFindProveedorClienteRucComponent, CompFindMedioPagoComponent, CompFindProductoComponent]

})

export class ComponentesModule { }

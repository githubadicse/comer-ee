import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompFindAlmacenComponent } from './comp-find-almacen/comp-find-almacen.component';
import { CompFindCodigoBarraComponent } from './comp-find-codigo-barra/comp-find-codigo-barra.component';

import { MatProgressBarModule, MatProgressBar } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule, MatPaginatorModule, MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { FechaMatComponent } from './fecha-mat/fecha-mat.component';
import { MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MOMENT_DATE_FORMATS, MomentDateAdapter } from '../shared/validators/MomentDateAdapter';

import { PaginatorModule } from 'primeng/paginator';
import { CompTipoDocumentoIdentidadComponent } from './comp-tipo-documento-identidad/comp-tipo-documento-identidad.component';
import { CompFindProveedorClienteRucComponent } from './comp-find-proveedor-cliente-ruc/comp-find-proveedor-cliente-ruc.component';
import { CompFindMedioPagoComponent } from './comp-find-medio-pago/comp-find-medio-pago.component';
import { CompFindProductoComponent } from './comp-find-producto/comp-find-producto.component';
import { CompFindProductoListComponent } from './comp-find-producto-list/comp-find-producto-list.component';
import { CompFindMotivoIsAlmacenComponent } from './comp-find-motivo-is-almacen/comp-find-motivo-is-almacen.component';
import { CompFindProveedorClienteListComponent } from './comp-find-proveedor-cliente-list/comp-find-proveedor-cliente-list.component';
import { CompTipoDocumentoSunatComponent } from './comp-tipo-documento-sunat/comp-tipo-documento-sunat.component';
import { CompFindEmpleadoComponent } from './comp-find-empleado/comp-find-empleado.component';
import { CompFindFilialComponent } from './comp-find-filial/comp-find-filial.component';
import { CompFindTipoDocumentoSunatSoloComponent } from './comp-find-tipo-documento-sunat-solo/comp-find-tipo-documento-sunat-solo.component';
import { CompFindPeriodoAlmacenComponent } from './comp-find-periodo-almacen/comp-find-periodo-almacen.component';
import { CompFindProductoAlmacenComponent } from './comp-find-producto-almacen/comp-find-producto-almacen.component';
import { CompProductoCarritoComponent } from './comp-producto-carrito/comp-producto-carrito.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    PaginatorModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  providers : [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter }
  ],

  declarations: [
    FechaMatComponent,
    CompFindCodigoBarraComponent,
    CompFindAlmacenComponent, 
    CompTipoDocumentoIdentidadComponent, 
    CompFindProveedorClienteRucComponent, 
    CompFindMedioPagoComponent, 
    CompFindProductoComponent, 
    CompFindProductoListComponent, 
    CompFindMotivoIsAlmacenComponent, 
    CompFindProveedorClienteListComponent,
    CompFindCodigoBarraComponent, 
    CompTipoDocumentoSunatComponent,
    CompFindEmpleadoComponent,
    CompFindFilialComponent,
    CompFindTipoDocumentoSunatSoloComponent,
    CompFindPeriodoAlmacenComponent,
    CompFindProductoAlmacenComponent,
    CompProductoCarritoComponent,    
  ],
  exports: [
    MatDatepickerModule,
    FechaMatComponent,
    CompFindAlmacenComponent, 
    CompTipoDocumentoIdentidadComponent, 
    CompFindProveedorClienteRucComponent, 
    CompFindMedioPagoComponent, 
    CompFindProveedorClienteListComponent,
    CompFindProductoComponent,
    CompFindProductoListComponent, 
    CompFindCodigoBarraComponent, 
    CompFindMotivoIsAlmacenComponent,
    CompTipoDocumentoSunatComponent,
    CompFindEmpleadoComponent,
    CompFindFilialComponent,
    CompFindTipoDocumentoSunatSoloComponent,
    CompFindPeriodoAlmacenComponent,
    CompFindProductoAlmacenComponent,
    CompProductoCarritoComponent
  ]
})

export class ComponentesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentacionRoutingModule } from './documentacion.routing';

import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';
import { ControlesDocumentacionComponent } from './controles-documentacion/controles-documentacion.component';

import { CompFindCodigoBarraComponent } from '../componentes/comp-find-codigo-barra/comp-find-codigo-barra.component';

import { MatSlideToggleModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { CompFindAlmacenComponent } from '../componentes/comp-find-almacen/comp-find-almacen.component';
import { ControlFindAlmacenComponent } from './control-find-almacen/control-find-almacen.component';
import { MatInputModule } from '@angular/material/input';
import { ControlFindCodigoBarraComponent } from './control-find-codigo-barra/control-find-codigo-barra.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ControlProveedorClienteComponent } from './control-proveedor-cliente/control-proveedor-cliente.component';
import { CompTipoDocumentoIdentidadComponent } from '../componentes/comp-tipo-documento-identidad/comp-tipo-documento-identidad.component';
import { CompFindProveedorClienteRucComponent } from '../componentes/comp-find-proveedor-cliente-ruc/comp-find-proveedor-cliente-ruc.component';
import { ControlMedioPagoComponent } from './control-medio-pago/control-medio-pago.component';
import { CompFindMedioPagoComponent } from '../componentes/comp-find-medio-pago/comp-find-medio-pago.component';
import { ControlFindProductoComponent } from './control-find-producto/control-find-producto.component';
import { CompFindProductoComponent } from '../componentes/comp-find-producto/comp-find-producto.component';
import { PaginatorModule } from 'primeng/paginator';
import { ComponentesModule } from '../componentes/componentes.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    DocumentacionRoutingModule,    
    PaginatorModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTabsModule,    
    MatAutocompleteModule,
    MatSelectModule,
    MatProgressBarModule,

    ComponentesModule


  ],
  declarations: [
    MainDocumentacionComponent, 
    ControlesDocumentacionComponent,

    ControlFindAlmacenComponent,
    ControlFindCodigoBarraComponent,
    ControlProveedorClienteComponent,    
    ControlMedioPagoComponent, ControlFindProductoComponent    
  ]
})

export class DocumentacionModule { }

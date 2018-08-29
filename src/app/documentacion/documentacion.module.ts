import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentacionRoutingModule } from './documentacion.routing';

import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';
import { ControlesDocumentacionComponent } from './controles-documentacion/controles-documentacion.component';
import { ComFindTipoDocumentoSunatModule } from '../intercambio/com-find-tipo-documento-sunat/com-find-tipo-documento-sunat.module';
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


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    DocumentacionRoutingModule,    
    MatInputModule,
    MatSlideToggleModule,
    MatTabsModule,    
    MatAutocompleteModule,
    MatSelectModule,
    MatProgressBarModule,
    ComFindTipoDocumentoSunatModule,    
  ],
  declarations: [
    MainDocumentacionComponent, 
    ControlesDocumentacionComponent,
    CompFindAlmacenComponent,
    ControlFindAlmacenComponent,
    CompFindCodigoBarraComponent,
    CompTipoDocumentoIdentidadComponent,
    ControlFindCodigoBarraComponent,
    ControlProveedorClienteComponent
  ]
})

export class DocumentacionModule { }

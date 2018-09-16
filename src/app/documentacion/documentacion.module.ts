import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentacionRoutingModule } from './documentacion.routing';

import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';
import { ControlesDocumentacionComponent } from './controles-documentacion/controles-documentacion.component';

import { MatSlideToggleModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { ControlFindAlmacenComponent } from './control-find-almacen/control-find-almacen.component';
import { ControlFindCodigoBarraComponent } from './control-find-codigo-barra/control-find-codigo-barra.component';
import { ControlProveedorClienteComponent } from './control-proveedor-cliente/control-proveedor-cliente.component';
import { ControlMedioPagoComponent } from './control-medio-pago/control-medio-pago.component';
import { ControlFindProductoComponent } from './control-find-producto/control-find-producto.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { ControlFindMotivoIsAlmacenComponent } from './control-find-motivo-is-almacen/control-find-motivo-is-almacen.component';

import { ControlFindEmpleadoComponent } from './control-find-empleado/control-find-empleado.component';

import {ControlFindFechaComponent} from './control-find-fecha/control-find-fecha.component';

import { ControlFindFilialComponent } from './control-find-filial/control-find-filial.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    DocumentacionRoutingModule,
    MatSlideToggleModule,
    MatTabsModule,    
    ComponentesModule
  ],
  declarations: [
    MainDocumentacionComponent, 
    ControlesDocumentacionComponent,    
    ControlFindAlmacenComponent,
    ControlFindCodigoBarraComponent,
    ControlProveedorClienteComponent,    
    ControlMedioPagoComponent, 
    ControlFindProductoComponent,
    ControlFindMotivoIsAlmacenComponent,
    ControlFindFechaComponent ,   
    ControlFindEmpleadoComponent,
    ControlFindFilialComponent    ,
    ControlFindEmpleadoComponent    
  ]
})

export class DocumentacionModule { }

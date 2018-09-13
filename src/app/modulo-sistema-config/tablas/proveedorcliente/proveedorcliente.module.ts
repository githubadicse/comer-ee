import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorclienteRoutingModule } from './proveedorcliente-routing.module';
import { ProveedorclienteMainComponent } from './proveedorcliente-main/proveedorcliente-main.component';
import { ProveedorclienteListaComponent } from './proveedorcliente-lista/proveedorcliente-lista.component';
import { ProveedorclienteEdicionComponent } from './proveedorcliente-edicion/proveedorcliente-edicion.component';
import { GrowlModule, DataTableModule, AutoCompleteModule } from "primeng/primeng";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    ProveedorclienteRoutingModule,
   GrowlModule,
    DataTableModule,    
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule  ,
    HttpClientModule
    

  ],
  declarations: [ProveedorclienteMainComponent, ProveedorclienteListaComponent, ProveedorclienteEdicionComponent]
})
export class ProveedorclienteModule { }

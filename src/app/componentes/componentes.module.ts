import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompFindAlmacenComponent } from './comp-find-almacen/comp-find-almacen.component';
import { CompFindCodigoBarraComponent } from './comp-find-codigo-barra/comp-find-codigo-barra.component';

import { MatProgressBarModule, MatProgressBar } from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material';
import { CompFindCodigoBarraModule } from './comp-find-codigo-barra/comp-find-codigo-barra.module';
import { CompTipoDocumentoIdentidadComponent } from './comp-tipo-documento-identidad/comp-tipo-documento-identidad.component';
import { CompFindProveedorClienteRucComponent } from './comp-find-proveedor-cliente-ruc/comp-find-proveedor-cliente-ruc.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    
    CompFindCodigoBarraModule
    
  ],
  declarations: [CompFindAlmacenComponent, CompTipoDocumentoIdentidadComponent, CompFindProveedorClienteRucComponent],
  exports: [CompFindAlmacenComponent, CompTipoDocumentoIdentidadComponent, CompFindProveedorClienteRucComponent]
})

export class ComponentesModule { }

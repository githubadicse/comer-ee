import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompFindAlmacenComponent } from './comp-find-almacen/comp-find-almacen.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material';
// import { CompTipoDocumentoSunatComponent } from './comp-tipo-documento-sunat/comp-tipo-documento-sunat.component';
import { CompFindCodigoBarraComponent } from './comp-find-codigo-barra/comp-find-codigo-barra.component';

// import { CompTipoDocumentoSunatComponent } from './comp-tipo-documento-sunat/comp-tipo-documento-sunat.component';
// import { ComTipoDocumentoSunatModule } from './comp-tipo-documento-sunat/comp-tipo-documento-sunat.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CompFindAlmacenComponent,    
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    // CompTipoDocumentoSunatComponent,
    CompFindCodigoBarraComponent
  ],  
  exports: [],
  declarations: []
})

export class ComponentesModule { }

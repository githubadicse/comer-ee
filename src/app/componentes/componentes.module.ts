import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompFindAlmacenComponent } from './comp-find-almacen/comp-find-almacen.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CompFindAlmacenComponent,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
    
  ],
  declarations: []
})
export class ComponentesModule { }

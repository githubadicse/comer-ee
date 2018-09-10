import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CompFindProductoListComponent } from './comp-find-producto-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatAutocompleteModule,
  ],
  declarations: [CompFindProductoListComponent],
  exports: [CompFindProductoListComponent]
})
export class CompFindProductoListModule { }

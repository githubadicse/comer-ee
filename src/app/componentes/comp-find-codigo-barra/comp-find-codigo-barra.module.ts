import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CompFindCodigoBarraComponent } from './comp-find-codigo-barra.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,    
  ],
  declarations: [CompFindCodigoBarraComponent],
  exports: [CompFindCodigoBarraComponent]
})
export class CompFindCodigoBarraModule { }

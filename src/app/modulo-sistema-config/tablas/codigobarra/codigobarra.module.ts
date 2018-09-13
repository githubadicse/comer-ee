import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodigobarraRoutingModule } from './codigobarra-routing.module';
import { CodigobarraComponent } from './codigobarra.component';


@NgModule({
  imports: [
    CommonModule,
    CodigobarraRoutingModule
  ],
  declarations: [CodigobarraComponent]
})
export class CodigobarraModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedioPagoRoutingModule } from './medio-pago-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MedioPagoRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: []
})
export class MedioPagoModule { }

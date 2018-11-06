import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuntoDeVentaRoutingModule } from './punto-de-venta-routing.module';
import { MainComponent } from './main/main.component';
import { ListaComponent } from './lista/lista.component';
import { EditComponent } from './edit/edit.component';
import { GrowlModule, DataTableModule, FileUploadModule, ConfirmDialogModule } from 'primeng/primeng';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

import { VentaClienteComponent } from '../componentes/venta-cliente/venta-cliente.component';
import { VentaFormaPagoComponent } from '../componentes/venta-forma-pago/venta-forma-pago.component';
import { VentaComprobanteComponent } from '../componentes/venta-comprobante/venta-comprobante.component';
import { NextFocusDirective } from '../../shared/directives/next-focus.directive';

import { MatSortModule, MatPaginatorModule, MatIconModule,
                MatProgressSpinnerModule, MatFormFieldModule, MatInputModule,
                MatButtonModule, MatSlideToggleModule, MatDialogModule,
                MatSelectModule, MatTableModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PuntoDeVentaRoutingModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ConfirmDialogModule,

    ComponentesModule,
    MatSortModule, MatTableModule, MatCardModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule ,
    MatSelectModule,
    MatDialogModule
  ],
  declarations: [
    MainComponent,
    ListaComponent,
    EditComponent,
    VentaClienteComponent,
    VentaFormaPagoComponent,
    VentaComprobanteComponent,
    NextFocusDirective
  ]
})
export class PuntoDeVentaModule { }

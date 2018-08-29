import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule, MatSlideToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

import { ComFindTipoDocumentoSunatModule } from '../intercambio/com-find-tipo-documento-sunat/com-find-tipo-documento-sunat.module';
import { ControlesDocumentacionComponent } from '../documentacion/controles-documentacion/controles-documentacion.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    ComFindTipoDocumentoSunatModule

  ],
  declarations: [ DashboardComponent, ControlesDocumentacionComponent ]
})

export class DashboardModule {}

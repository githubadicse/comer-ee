import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { MainComponent } from './main/main.component';
import { ControlDespachoMainComponent } from './control-despacho/control-despacho-main/control-despacho-main.component';
import { ValorizacionMainComponent } from './valorizacion/valorizacion-main/valorizacion-main.component';
import { SharedModule } from '../../shared/shared.module';
import {BlockUIModule} from 'primeng/blockui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { PlanRastreabilidadComponent } from './plan-rastreabilidad/plan-rastreabilidad.component';
import { ComponentesModule } from '../../componentes/componentes.module';

import { AlmacenService } from '../../modulo-almacen/almacen/almacen.service';



@NgModule({
  imports: [
    CommonModule,
    BlockUIModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConsultasRoutingModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    ComponentesModule,
    SharedModule
    
  ],
  providers : [AlmacenService],
  declarations: [MainComponent, ControlDespachoMainComponent, ValorizacionMainComponent, PlanRastreabilidadComponent]
})
export class ConsultasModule { }

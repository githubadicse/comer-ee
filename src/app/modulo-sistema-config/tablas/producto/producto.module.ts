import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DataTableModule, GrowlModule, AutoCompleteModule, FileUploadModule } from 'primeng/primeng';

import { MainComponent } from './main/main.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductodetalleComponent } from './productodetalle/productodetalle.component';
import { AutocompletComponent } from './autocomplet.component';

import { ProductoRoutingModule } from './producto-routing.module';


import { TableModule } from 'primeng/table';

// material
import { MatInputModule, MatSelectModule, MatAutocompleteModule, MatExpansionModule, MatSlideToggleModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { MarcaArticuloEditarComponent } from '../marca-articulo/marca-articulo-editar/marca-articulo-editar.component';
import { SharedModule } from '../../../shared/shared.module';
import { CategoriaArticuloEditarComponent } from '../../../modulo-almacen/categoria-articulo/categoria-articulo-editar/categoria-articulo-editar.component';


// import { HttpModule } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
//import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductoRoutingModule,
    GrowlModule,
    DataTableModule,    
    TableModule,
    SharedModule,    
    FormsModule, ReactiveFormsModule,
    AutoCompleteModule,
    FileUploadModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,    
    MatExpansionModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule
  ],
 
  declarations: [ProductoComponent, ProductodetalleComponent, MarcaArticuloEditarComponent, CategoriaArticuloEditarComponent, MainComponent, AutocompletComponent]
})
export class ProductoModule { }

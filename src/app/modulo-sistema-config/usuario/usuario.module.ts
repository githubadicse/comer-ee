import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioMainComponent } from './usuario-main/usuario-main.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { GrowlModule, DataTableModule, FileUploadModule, ConfirmDialogModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { MatInputModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ConfirmDialogModule,
    HttpClientModule,
    TableModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  declarations: [UsuarioMainComponent, UsuarioEditComponent, UsuarioListComponent]
})
export class UsuarioModule { }
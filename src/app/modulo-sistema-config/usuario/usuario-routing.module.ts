import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioMainComponent } from './usuario-main/usuario-main.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';

const routes: Routes = [
  {
    path: '', component: UsuarioMainComponent,

    children : [
      {
        path : '', redirectTo : 'lista'
      },
      {
        path : 'lista', component : UsuarioListComponent,
        children : [
          {
            path : 'edicion', component: UsuarioEditComponent
          }
        ]
        
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

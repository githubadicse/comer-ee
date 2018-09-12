import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipodocumentoMainComponent } from './tipodocumento-main/tipodocumento-main.component';
import { TipodocumentoGridComponent } from './tipodocumento-grid/tipodocumento-grid.component';
import { TipodocumentoEditComponent } from './tipodocumento-edit/tipodocumento-edit.component';

const routes: Routes = [
  {
    path: '', component: TipodocumentoMainComponent,

    children: [
      {
        path: '', redirectTo: 'lista'
      },
      {
        path: 'lista', component: TipodocumentoGridComponent,
        children: [
          {
            path: 'edicion', component: TipodocumentoEditComponent
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
export class TipodocumentoRoutingModule { }

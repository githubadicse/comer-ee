import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';
import { ControlesDocumentacionComponent } from './controles-documentacion/controles-documentacion.component';

const routes: Routes = [
    {
        path: '', component: MainDocumentacionComponent,
        children: [            
            {
                path: 'tipo-documento', component: ControlesDocumentacionComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentacionRoutingModule { }
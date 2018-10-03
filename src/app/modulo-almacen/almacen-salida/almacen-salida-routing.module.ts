import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenSalidaMainComponent } from './almacen-salida-main/almacen-salida-main.component';
import { AlmacenSalidaListaComponent } from './almacen-salida-lista/almacen-salida-lista.component';
import { AlmacenSalidaEdicionComponent } from './almacen-salida-edicion/almacen-salida-edicion.component';
import { KardexOptsComponent } from '../kardex/kardex-opts/kardex-opts.component';




// const routes: Routes = [
//   {
  
//       path: 'main',
//       component: AlmacenSalidaMainComponent , 
//       children: [
//         {
//           path: '',  redirectTo:'lista'
//         },
//         {
//           path: 'lista', component: AlmacenSalidaListaComponent,
//           children : [
//             {
//               path :'edicion' , component: AlmacenSalidaEdicionComponent,
//               children : [
//                 {
//                   path : 'kardex', component : KardexOptsComponent
//                 }
//               ]
//             }
//           ]

//         }
      
    
//       ]
  
  
//     },
  
//     {
//       path: '**', component: AlmacenSalidaListaComponent
//     }
  
//   ];

  const routes: Routes = [
    {
      path : '', component : AlmacenSalidaMainComponent,
  
      children : [
        {
          path : '', redirectTo : 'lista'
        },
        {
          path : 'lista', component : AlmacenSalidaListaComponent,
          children : [
            {
              path : 'edicion' , component : AlmacenSalidaEdicionComponent
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
export class AlmacenSalidaRoutingModule { }

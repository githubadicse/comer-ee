import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../../modulo-sistema-config/tablas/producto/model/producto.model';


@Component({
  selector: 'app-control-find-producto',
  templateUrl: './control-find-producto.component.html',
  styles: []
})
export class ControlFindProductoComponent implements OnInit {
  disabledAlamcen: boolean = false;
  producto: ProductoModel;

  idalmacen: number = 1;
  parametroBuscar: string = '';

  constructor() { }

  ngOnInit() {
  }

  _getObject(e: ProductoModel) {
    this.producto = e;
    console.log("Informacion desde el componente :" + JSON.stringify(e));    
  }

  _getObjectList(e: ProductoModel) {
    this.producto = e;
    console.log("Desde buscador list :" + JSON.stringify(e));    
  }

  _getBuscarMasDe(e: any) {
    this.idalmacen = e.idalmacen;
    this.parametroBuscar = e.parametro;
  }
}

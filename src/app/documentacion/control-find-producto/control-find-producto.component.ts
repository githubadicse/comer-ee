import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../../modulo-almacen/producto/model/producto.model';

@Component({
  selector: 'app-control-find-producto',
  templateUrl: './control-find-producto.component.html',
  styles: []
})
export class ControlFindProductoComponent implements OnInit {
  disabledAlamcen: boolean = false;
  producto: ProductoModel;

  constructor() { }

  ngOnInit() {
  }

  _getObject(e: ProductoModel) {
    this.producto = e;
    console.log("Informacion desde el componente :" + JSON.stringify(e));    
  }

}

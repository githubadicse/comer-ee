import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductoModel } from '../../modulo-almacen/producto/model/producto.model';
import { ProductoService } from '../../modulo-almacen/producto/service/producto.service';


@Component({
  selector: 'app-comp-find-codigo-barra',
  templateUrl: './comp-find-codigo-barra.component.html',
  styleUrls: ['./comp-find-codigo-barra.component.scss'],
  providers: [ProductoService],    
})

export class CompFindCodigoBarraComponent implements OnInit {
  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;
  
  @Output()
  getObject: EventEmitter<ProductoModel> = new EventEmitter();  

  public producto: ProductoModel;

  private cargando: boolean = false;

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
  }

  public buscarCodigo(codigo: string): void {    
    this.cargando = true;
    this.productoService.getProductoByCodigoBarras(codigo).subscribe(
      (res: any) => {      
        this.producto = <ProductoModel>res;  
        if (!this.producto) { this._formControlName.setErrors({ 'incorrect': true, 'msj': 'No se encontro registros.' }); }        
        this.getObject.emit(this.producto);        
        this.cargando = false;
      }
    )
  }

}

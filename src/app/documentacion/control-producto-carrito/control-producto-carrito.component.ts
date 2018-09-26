import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../../modulo-sistema-config/tablas/producto/model/producto.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs/internal/operators/filter';
import { LocalStorageManagerService } from '../../shared/servicio/local-storage-manager.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-control-producto-carrito',
  templateUrl: './control-producto-carrito.component.html',
  styles: []
})
export class ControlProductoCarritoComponent implements OnInit {
  producto: ProductoModel;
  form: FormGroup;
  productosCarrito: any;

  private countItemCarrito: Subscription = null;

  
  constructor(
    private formBuilder: FormBuilder,
    private localStorageManagerService: LocalStorageManagerService
  ) { }

  ngOnInit() {

    this.countItemCarrito = this.localStorageManagerService.countItem$.subscribe(res => console.log('respuesta desde servicio local storage: ', res))

    this.form = this.formBuilder.group({
      producto: this.producto,
      cantidad: ['', Validators.required],
      lote: ['', Validators.required],
      fechavencimiento: ['', Validators.required]
    });
  }

  ngOnDestroy(){
    this.countItemCarrito.unsubscribe();
  }

  addCarrito() {
    this.productosCarrito = this.form.value;
    this.localStorageManagerService.setDataLocalStorage('carrito',this.productosCarrito);
  }  

  _getObjectList(e: ProductoModel) {
    this.producto = e;
    console.log('emnite: ',e);
  }
}

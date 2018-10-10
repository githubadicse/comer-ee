import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ProductoModel } from '../../modulo-sistema-config/tablas/producto/model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {

  
  private countItemSource = new BehaviorSubject<number>(0);
  public countItem$ = this.countItemSource.asObservable();

  private ListaProductosCarrito: any[] = [];
  
  constructor() { }

  public getDataLocalStorage(key: string): any[] {
    return JSON.parse(localStorage.getItem(key));
  }

  public getByIndexItemLocalStorage(key: string, index: number): any[] {
    this.ListaProductosCarrito = JSON.parse(localStorage.getItem(key)) || [];    
    return this.ListaProductosCarrito[index];
  }

  // guarda la data tal cual es recibida sin hacer validaciones de busqieda
  public setAllDataLocalStorage(key: string, data: any){
    this.ListaProductosCarrito = data;
    this.saveLocalStorage(key);
  }

  // item: obligado debe incluir [productoModel] todos los datos que se va a guardar  
  public setDataLocalStorage(key: string, item: any): void {
    const producto: ProductoModel = item.producto;    
    this.ListaProductosCarrito = JSON.parse(localStorage.getItem(key)) || [];
    const index = this.buscarProducto(producto) === null ? this.ListaProductosCarrito.length : this.buscarProducto(producto);
    
    this.ListaProductosCarrito[index] = JSON.parse(JSON.stringify(item));    
    this.saveLocalStorage(key);
  }

  public removeItemLocalStorage(key: string, index: number): void {    
    this.ListaProductosCarrito = JSON.parse(localStorage.getItem(key))
    this.ListaProductosCarrito.splice(index,1);
    this.saveLocalStorage(key);
  }

  public removeAllLocalSotrage(key: string){
    localStorage.removeItem(key);
    this.ListaProductosCarrito = [];
    this.countItemLocalSotrage();
  }

  private buscarProducto(producto: ProductoModel): number {
    let _index: number = null;
    this.ListaProductosCarrito        
        .map((x,index) => {
          if ( x.producto.idproducto === producto.idproducto ) {// producto ya existe en la lista            
            _index = index;
            return;
          }          
      })
    
      return _index;
  }

  private saveLocalStorage(key: string){
    localStorage.setItem(key,JSON.stringify(this.ListaProductosCarrito));
    this.countItemLocalSotrage();
  }

  private countItemLocalSotrage(): void {
     const numItems=this.ListaProductosCarrito.length;
     this.countItemSource.next(numItems);
  }

  public countInitLocalStorage(key: string): void {
    let itemKey: any = localStorage.getItem(key);    
    try {
      this.ListaProductosCarrito = JSON.parse(itemKey) || [];
    } catch (error) {
      this.ListaProductosCarrito = itemKey;
    }

    
    this.countItemLocalSotrage();
  }

}

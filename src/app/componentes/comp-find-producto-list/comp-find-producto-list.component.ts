import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';

import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { MatAutocompleteTrigger } from '@angular/material';

import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { ProductoService } from '../../modulo-sistema-config/tablas/producto/service/producto.service';
import { ProductoModel } from '../../modulo-sistema-config/tablas/producto/model/producto.model';
import { Observable } from 'rxjs/Observable';

export class buscarMasDe {
  public parametro: string = null;
  public idalmacen: number = null;  
}


@Component({
  selector: 'app-comp-find-producto-list',
  templateUrl: './comp-find-producto-list.component.html',
  styleUrls: ['./comp-find-producto-list.component.scss'],
  providers: [ProductoService]
})


export class CompFindProductoListComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Input() 
  idalmacen: number = 1;

  @Output()
  getObject: EventEmitter<ProductoModel> = new EventEmitter();
  
  @Output()
  getBuscarMasDe: EventEmitter<buscarMasDe> = new EventEmitter();

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;  

    
  public producto: ProductoModel;
  public productosModelOption: Observable<any[]>;

  public data:any;
  public esCodigoBarra:boolean = false; 
  public verFooter: boolean = false;
  

  constructor( private crudServiceProducto: ProductoService  ) {    
  }
  
  ngOnInit() {        
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
        
    this._formControlName!.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        map(value => value)
    ).subscribe(res => this.filtrar(res));    
  
  }

  private filtrar(filterValue) {        
    if (typeof filterValue !== 'string') {return;}   
    if (filterValue === '') { this.autocomplete.closePanel(); return; }

    this.crudServiceProducto.getProductoByParametro(filterValue, this.idalmacen).subscribe(
      (res: any) => {        
        this.data = res;

        this.verFooter = this.data.length > 2 ? true : false;

        // si es codigo de barra y si hay solo un registro
        // no muestra la lista, retorna el unico producto
        if (this.esCodigoBarra && this.data.length === 1) {
          this._onSelectionChange(null, this.data[0].producto)   
          this.autocomplete.closePanel();
          this._formControlName.setValue('');
        }        

        console.log(res);
        this.esCodigoBarra = false;
      }
    )

  }

  public checkCodigoBarra(): void {    
    this.esCodigoBarra = true;    
  }  

  public _focus(e){
    e.target.select();
    if(this.data) {
      this.autocomplete.closePanel();
    }
  }

  public _displayWith(val: ProductoModel): string {
    return val ? val.dscproducto : '';
  }


  public _onBuscarMasDe(): void {
    let _buscarMasDe: buscarMasDe = new buscarMasDe();
    _buscarMasDe.parametro = this._formControlName.value;
    _buscarMasDe.idalmacen = this.idalmacen;
    this.getBuscarMasDe.emit(_buscarMasDe);
    this.autocomplete.closePanel();
    console.log(_buscarMasDe);
  }

  public _onSelectionChange(a, b): void {    
    this.getObject.emit(b);    
    this.data=null;
    console.log(b);
  }

}

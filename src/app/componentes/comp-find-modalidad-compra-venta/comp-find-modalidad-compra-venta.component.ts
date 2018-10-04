import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';

@Component({
  selector: 'app-comp-find-modalidad-compra-venta',
  templateUrl: './comp-find-modalidad-compra-venta.component.html',
  styleUrls: ['./comp-find-modalidad-compra-venta.component.scss']
})
export class CompFindModalidadCompraVentaComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;
  
  @Output()
  getObject: EventEmitter<any> = new EventEmitter();  

  public ListModalidad: any[] = [];

  constructor(private crudService: CrudHttpClientServiceShared) { }

  ngOnInit() {
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this.loadListMoneda();
  }

  private loadListMoneda(): void {        
    this.crudService.getall('modalidadcompraventa','getall').subscribe(res => this.ListModalidad = <any[]>res );
  }
  
  _onSelectionChange(a) {
    this.getObject.emit(a.value);
  }

  compareModalidad(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.idModalidadCompraVenta === c2.idModalidadCompraVenta : c1 === c2;
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MonedaModel } from '../../modulo-sistema-config/tablas/moneda/moneda-model';
import { FormControl } from '@angular/forms';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';

@Component({
  selector: 'app-comp-find-moneda',
  templateUrl: './comp-find-moneda.component.html',
  styleUrls: ['./comp-find-moneda.component.scss'],
  providers: [CrudHttpClientServiceShared]
})
export class CompFindMonedaComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;
  
  @Output()
  getObject: EventEmitter<MonedaModel> = new EventEmitter();  

  public ListMoneda: MonedaModel[] = [];

  constructor(private crudService: CrudHttpClientServiceShared) { }

  ngOnInit() {
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this.loadListMoneda();
  }

  private loadListMoneda(): void {        
    this.crudService.getall('moneda','getall').subscribe(res => this.ListMoneda = <MonedaModel[]>res );
  }
  
  _onSelectionChange(a) {
    this.getObject.emit(a.value);
  }

  compareMoneda(c1: MonedaModel, c2: MonedaModel): boolean {
    return c1 && c2 ? c1.idMoneda === c2.idMoneda : c1 === c2;
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PeriodoalmacenModel } from '../../modulo-almacen/periodoalmacen/periodoalmacen-model';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';

@Component({
  selector: 'app-comp-find-periodo-almacen',
  templateUrl: './comp-find-periodo-almacen.component.html',
  styles: []
})
export class CompFindPeriodoAlmacenComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Input()
  _disabled: boolean = false;
  
  @Output()
  getObject: EventEmitter<PeriodoalmacenModel> = new EventEmitter();  

  public ListPeriodoAlmacen: PeriodoalmacenModel[] = [];

  constructor(private crudService: CrudHttpClientServiceShared) { }

  ngOnInit() {
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }

    this.loadListPeriodoAlmacen();
  }

  private loadListPeriodoAlmacen(): void {    
    this.crudService.getall('periodoalmacen', 'getall').subscribe((res: any) => {
      this.ListPeriodoAlmacen = <PeriodoalmacenModel[]>res
      this.ListPeriodoAlmacen.map((x: any) => {
        x.nommes = this.getNameMonth(x.mes);
      })
    } );
    
  }

  _onSelectionChange(a) {
    this.getObject.emit(a.value);
  }


  comparePeriodoAlmacen = (val1: PeriodoalmacenModel, val2: PeriodoalmacenModel) => {
    
    if(val1.idperiodoalmacen === val2.idperiodoalmacen){
      return true;
    }
    return false;
  }

  getNameMonth(num_mes: number): string { 
    const nombre_mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return nombre_mes[num_mes];
 }

}

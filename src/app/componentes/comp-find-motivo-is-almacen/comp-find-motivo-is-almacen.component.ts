import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';
import { MotivoSalidaModel } from '../../modulo-sistema-config/tablas/motivo-salida/motivo-salida-model';
import { MotivoIngresoModel } from '../../modulo-sistema-config/tablas/motivo-ingreso/motivo-ingreso-model';


@Component({
  selector: 'app-comp-find-motivo-is-almacen',
  templateUrl: './comp-find-motivo-is-almacen.component.html',
  styleUrls: ['./comp-find-motivo-is-almacen.component.scss']
})
export class CompFindMotivoIsAlmacenComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Input()
  tipoMotivo: string = 'i'; // s = salida , i = ingresos
  
  @Output()
  getObject: EventEmitter<MotivoSalidaModel | MotivoIngresoModel> = new EventEmitter();  

  public ListMotivos: MotivoSalidaModel[] | MotivoIngresoModel[] = [];

  constructor(private crudService: CrudHttpClientServiceShared) { }

  ngOnInit() {

    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this.loadListMotivos();

  }

  private loadListMotivos(): void {
    if (this.tipoMotivo === 'i') {
      this.crudService.getall('motivoingreso', 'getall').subscribe((res: any) => this.ListMotivos = <MotivoIngresoModel[]>res.data );
    } else {
      this.crudService.getall('motivosalida', 'getall').subscribe((res: any) => this.ListMotivos = <MotivoSalidaModel[]>res.data );
    }
  }

  _onSelectionChange(a) {
    this.getObject.emit(a.value);
  }

  compareMotivo = (val1: any, val2: any):boolean => val1.dscmotivoingreso === val2;
  

}

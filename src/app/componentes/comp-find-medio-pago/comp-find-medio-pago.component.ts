import { Component,  OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';
import { MedioPagoModel } from '../../modulo-sistema-config/tablas/medio-pago/medio-pago.model';
import { MedioPagoService } from '../../modulo-sistema-config/tablas/medio-pago/medio-pago.service';

@Component({
  selector: 'app-comp-find-medio-pago',
  templateUrl: './comp-find-medio-pago.component.html',
  styleUrls: ['./comp-find-medio-pago.component.scss']
})
export class CompFindMedioPagoComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;
  
  @Output()
  getObject: EventEmitter<MedioPagoModel> = new EventEmitter();  

  public ListMedioPagos: MedioPagoModel[] = [];

  constructor(private medioPagoService: MedioPagoService) { 
    
  }

  ngOnInit() {
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this.loadListMedioPago();
  }

  private loadListMedioPago(): void {    
    this.medioPagoService.getall().subscribe(res => this.ListMedioPagos = <MedioPagoModel[]>res );
  }
  
  _onSelectionChange(a,b) {
    this.getObject.emit(a.value);
  }

  compareMedioPago = (val1: any, val2: any) => val1 === val2;

}

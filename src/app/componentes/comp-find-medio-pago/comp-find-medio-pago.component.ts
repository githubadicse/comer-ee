import { Component,  OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';

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
  getObject: EventEmitter<any> = new EventEmitter();  

  public ListMedioPago: any;

  constructor(private crudService: CrudHttpClientServiceShared) { 
    
  }

  ngOnInit() {
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this.loadListMedioPago();
  }

  private loadListMedioPago(): void {
    this.crudService.getall('mediopago', 'getall').subscribe(res => this.ListMedioPago = res );
  }
  
  _onSelectionChange(a) {
    this.getObject.emit(a.value);
  }

  compareMedioPago = (val1: any, val2: any) => val1.serie === val2;

}

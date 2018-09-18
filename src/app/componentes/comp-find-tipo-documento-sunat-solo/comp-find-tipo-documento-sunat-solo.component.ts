import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TipodocumentoModel } from '../../modulo-sistema-config/tipodocumento/tipodocumento-model';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';

@Component({
  selector: 'app-comp-find-tipo-documento-sunat-solo',
  templateUrl: './comp-find-tipo-documento-sunat-solo.component.html',
  styles: []
})
export class CompFindTipoDocumentoSunatSoloComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Input()
  _disabled: boolean = false;
  
  @Output()
  getObject: EventEmitter<TipodocumentoModel> = new EventEmitter();  

  public ListTipoDocumentoSunat: TipodocumentoModel[] = [];
  
  constructor(private crudService: CrudHttpClientServiceShared) { }

  ngOnInit() {
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }

    this.loadTipoDocumentoSunat();
  }

  private loadTipoDocumentoSunat(): void {
    this.crudService.getall('tipodocumento', 'getall').subscribe((res: any) => this.ListTipoDocumentoSunat = <TipodocumentoModel[]>res );
  }

  _onSelectionChange(a) {
    this.getObject.emit(a.value);
  }

  compareTipoDocumentoSunat = (val1: TipodocumentoModel, val2: TipodocumentoModel) => {
    
    if(val1.idTipoDocumento === val2.idTipoDocumento){
      return true;
    }
    return false;
  }

}

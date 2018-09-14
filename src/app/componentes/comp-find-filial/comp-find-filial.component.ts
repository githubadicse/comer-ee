import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilialModel } from '../../modulo-sistema-config/filial/filial-model';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';

@Component({
  selector: 'app-comp-find-filial',
  templateUrl: './comp-find-filial.component.html',
  styles: []
})
export class CompFindFilialComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Input()
  _disabled: boolean = false;
  
  @Output()
  getObject: EventEmitter<FilialModel> = new EventEmitter();  

  public ListFilial: FilialModel[] = [];

  
  constructor(private crudService: CrudHttpClientServiceShared) { }

  ngOnInit() {
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }

    this.loadListFilial();
  }

  private loadListFilial(): void {    
    this.crudService.getall('filial', 'getall').subscribe((res: any) => this.ListFilial = <FilialModel[]>res );
    
  }

  _onSelectionChange(a) {
    this.getObject.emit(a.value);
  }

  compareFilial = (val1: any, val2: any) => val1.idfilial === val2;

}

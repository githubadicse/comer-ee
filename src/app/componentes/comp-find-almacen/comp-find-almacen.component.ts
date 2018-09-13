import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { element } from 'protractor';
import { Subject, of } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { AlmacenService } from '../../modulo-sistema-config/tablas/almacen/almacen.service';
import { AlmacenModel } from '../../modulo-sistema-config/tablas/almacen/almacen-model';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-comp-find-almacen',
  templateUrl: './comp-find-almacen.component.html',
  styleUrls: ['./comp-find-almacen.component.scss'],
  providers: [AlmacenService]
})
export class CompFindAlmacenComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName:FormControl;

  @Input()
  idFilial:number;

  @Output()
  getObject:EventEmitter<AlmacenModel> = new EventEmitter();



  public almacensModel: AlmacenModel[] = [];
  public almacensModelOption: Observable<AlmacenModel[]>;
  public almacenModel: AlmacenModel;

  constructor(private almacenService: AlmacenService) {
    
  }

  ngOnInit() {

    this.getAlmacenByFilial();    

    if(this._formControlName == undefined){
      this._formControlName = this.myControl;
    }

    this.almacensModelOption = this._formControlName!.valueChanges
      .pipe(
        startWith(''),
        //distinctUntilChanged(),
        debounceTime(500),
        map(value => this._filterAlmacen(value))

      )

  }

  private _filterAlmacen(value: any) {
    let filterValue;

    if(typeof value === 'string' ){
      filterValue = value.toLowerCase();
    }else{
      filterValue = value['dscalmacen'].toLowerCase();
    }
    

    let optionsList = this.almacensModel
      .map(
        item => {
          return new AlmacenModel(item.idalmacen, item.dscalmacen, item.direccion);
        });

    if (value) {
      optionsList = optionsList.filter(
        item => item.dscalmacen.toLowerCase().indexOf(filterValue) >= 0
      )
      return optionsList;

    }
    return optionsList

  }



  getAlmacenByFilial() {

    this.almacenService.getAlmacenByIdFilial(this.idFilial)
      .subscribe(
        res => {
          this.almacensModel = res.map(
            item => {
              return new AlmacenModel(item.idalmacen, item.dscalmacen, item.direccion);
            }
          );
        }, error => console.log(error),
        () => { }
      )
  }


  _displayWith(almacen:AlmacenModel):string{
    return almacen ? almacen.dscalmacen : '';
  }

  _onSelectionChange(a,b){
    debugger;
    this.getObject.emit(b);
  }

}

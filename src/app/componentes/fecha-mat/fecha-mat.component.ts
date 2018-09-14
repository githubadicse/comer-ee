import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '../../shared/validators/MomentDateAdapter';
import * as moment from 'moment';
import { getQueryValue } from '@angular/core/src/view/query';

@Component({
  selector: 'app-fecha-mat',
  templateUrl: './fecha-mat.component.html',
  styleUrls: ['./fecha-mat.component.scss'],
  providers : [MomentDateAdapter]
})
export class FechaMatComponent implements OnInit {


  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName:FormControl;
  
  @Input()
  _placeholder:string;

  @Input()
  _valueInicial:any

  @Output()
  getObject: EventEmitter<String> = new EventEmitter();  

  
  
  constructor(private DateAdapter:MomentDateAdapter) { }

  ngOnInit() {

    if(this._formControlName == undefined){
      this._formControlName = this.myControl;


    } else{
      let date:string = this._formControlName.value;

        let dateMoment = this.DateAdapter.createDateMomentFromString ( date );

        this._formControlName.setValue(dateMoment);      
        this._valueInicial = this._formControlName.value;


    }   
  }

  dateChange(event){
    let _moment:moment.Moment;
    _moment = event.value;
    let someDateString = _moment.format("DD/MM/YYYY");
    this.getObject.emit(someDateString); 
  }
  updateDateToString(event) {
    debugger;
    let newDate = new Date(event)
    
    let dd: number | string = newDate.getDate();
    if (dd < 10) {
      dd = '0' + dd;
    }
    let mm: number | string = newDate.getMonth() + 1;
    if (mm < 10) {
      mm = '0' + mm;
    }

    const yy: number = newDate.getFullYear();
    //this.myModel.MyDateString = `${yy}-${mm}-${dd}`;   
    debugger;
    this.getObject.emit(dd+"/"+mm+"/"+yy);         
  }

  
  _keyPress(event: any) {
    
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.charCode);

    

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}

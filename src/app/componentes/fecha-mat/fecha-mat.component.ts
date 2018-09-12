import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '../../shared/validators/MomentDateAdapter';
import * as moment from 'moment';

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

  
  
  constructor(private DateAdapter:MomentDateAdapter) { }

  ngOnInit() {
    debugger;
    if(this._formControlName == undefined){
      this._formControlName = this.myControl;


    } else{
      let date:string = this._formControlName.value;

        let dateMoment = this.DateAdapter.createDateMomentFromString ( date );

        this._formControlName.setValue(dateMoment);      
        this._valueInicial = this._formControlName.value;


    }   
  }

  updateDateToString(event) {
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
  }

  
  _keyPress(event: any) {
    debugger;
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.charCode);

    

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-find-fecha',
  templateUrl: './control-find-fecha.component.html'

})
export class ControlFindFechaComponent implements OnInit {


  dataForm: any;
  myControl: FormControl;
  valorDevuelto:string;
  flag=true;
    
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.dataForm = this.formBuilder.group({
      fecha: ['', Validators.required]

    })
  } 

  _getObject(e:string){
    this.valorDevuelto = e;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { FilialModel } from '../../modulo-sistema-config/filial/filial-model';

@Component({
  selector: 'app-control-find-filial',
  templateUrl: './control-find-filial.component.html',
  styles: []
})
export class ControlFindFilialComponent implements OnInit {


  dataForm: any;
  myControl: FormControl
  filial: FilialModel;
  _disabled: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.dataForm = this.formBuilder.group({
      anno: ['1', Validators.required],
      filial: ['', Validators.required]
    })
  }
  
  _getObject(e: any) {
    this.filial = e;
    console.log("Informacion desde el componente :" + JSON.stringify(e));
    console.log('formulario:', this.dataForm.value);
  }  

}

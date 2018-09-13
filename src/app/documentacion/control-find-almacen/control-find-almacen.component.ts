import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { AlmacenModel } from '../../modulo-sistema-config/tablas/almacen/almacen-model';


@Component({
  selector: 'app-control-find-almacen',
  templateUrl: './control-find-almacen.component.html'  
})
export class ControlFindAlmacenComponent implements OnInit {
  dataForm: any;  
  myControl: FormControl
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.dataForm = this.formBuilder.group({
      anno: ['1', Validators.required],      
      almacen: ['', Validators.required]
    })
  }

  _getObject(e: AlmacenModel) {
    console.log("Informacion desde el componente :" + JSON.stringify(e));
    console.log(this.dataForm.value);
  }

}

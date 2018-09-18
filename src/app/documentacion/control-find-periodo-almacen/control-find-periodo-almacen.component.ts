import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { PeriodoalmacenModel } from '../../modulo-almacen/periodoalmacen/periodoalmacen-model';

@Component({
  selector: 'app-control-find-periodo-almacen',
  templateUrl: './control-find-periodo-almacen.component.html',
  styles: []
})
export class ControlFindPeriodoAlmacenComponent implements OnInit {

  dataForm: any;
  myControl: FormControl
  periodoAlmacen: PeriodoalmacenModel;
  _disabled: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.dataForm = this.formBuilder.group({
      anno: ['1', Validators.required],
      periodoalmacen: ['', Validators.required]
    })
  }
  
  _getObject(e: PeriodoalmacenModel) {
    this.periodoAlmacen = e;
    console.log("Informacion desde el componente :" + JSON.stringify(e));
    console.log('formulario:', this.dataForm.value);
  }  

}

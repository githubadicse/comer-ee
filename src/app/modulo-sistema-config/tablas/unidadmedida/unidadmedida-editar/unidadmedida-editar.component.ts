import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { UnidadmedidaModel } from '../unidadmedida-model';
import { SharedService } from '../../../../shared/servicio/shared.service';



@Component({
  selector: 'app-unidadmedida-editar',
  templateUrl: './unidadmedida-editar.component.html',
  styleUrls: ['./unidadmedida-editar.component.css']
})
export class UnidadmedidaEditarComponent implements OnInit {
  [x: string]: any;
  unidadmedidaForm: any;
  public id:any;
  public unidadmedidaModel: UnidadmedidaModel;

  constructor(

    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );

  }

  ngOnInit() {
    this.buildForm();
    if(this.id != 0)
    this.getUnidadmedida(this.id);
  }


  buildForm() {
    this.unidadmedidaForm = this.formBuilder.group({
      idunidadmedida: ['0', Validators.required],
      dscunidadmedida: ['', Validators.required],
      abrunidadmedida: ['', Validators.required]

    })

  }

  getUnidadmedida(id) {

    this.sharedService.findById(id, "unidadmedida", "findbyid")
      .subscribe(
      result => {

   /*      this.unidadmedidaModel = [result.data].map(item => {
          return new UnidadmedidaModel(
            item.idunidadmedida,
            item.dscunidadmedida,
            item.abrunidadmedida
          )
        })[0]; */


        this.setForm(this.unidadmedidaModel);

      },
      error => { console.log(error) },
      () => {

      }
      );
  }

  setForm(model: UnidadmedidaModel) {
    this.unidadmedidaForm.setValue(model);
    
  }
  setModel(){
    this.unidadmedidaModel = new UnidadmedidaModel();
    this.unidadmedidaForm.controls.va
    
    
    this.unidadmedidaModel.idunidadmedida = this.unidadmedidaForm.controls['idunidadmedida'].value;
    this.unidadmedidaModel.dscunidadmedida = this.unidadmedidaForm.controls['dscunidadmedida'].value;
    this.unidadmedidaModel.abrunidadmedida = this.unidadmedidaForm.controls['abrunidadmedida'].value;
  }

  save() {

    this.setModel();
 
    this.sharedService.save(this.unidadmedidaModel, "unidadmedida", "save")
      .subscribe(
      res => {
        this.msgPopup = [];
        // if (res == false) {
        //   this.msgPopup.push({ severity: 'error', summary: 'Aviso', detail: res.msg });
        //   return false;
        // }

        this.msgPopup.push({ severity: 'success', summary: 'Aviso', detail: 'Registro Grabado !' });
      
        //this.unidadmedidaModel.idunidadmedida = res.data.idunidadmedida;

        this.setForm(this.unidadmedidaModel);


      }
      )
  }

}

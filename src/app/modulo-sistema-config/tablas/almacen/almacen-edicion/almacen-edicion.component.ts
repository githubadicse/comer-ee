import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { AlmacenModel } from '../almacen-model';
import { AlmacenService } from '../almacen.service';
import { CrudHttpClientServiceShared } from '../../../../shared/servicio/crudHttpClient.service.shared';
import { SharedService } from '../../../../shared/servicio/shared.service';



@Component({
  selector: 'ad-almacen-edicion',
  templateUrl: './almacen-edicion.component.html',
  styleUrls: ['./almacen-edicion.component.css'],
  providers: [AlmacenService, CrudHttpClientServiceShared]
})
export class AlmacenEdicionComponent implements OnInit {

  sub: any;
  msgPopup: any[];
  id: any;

  public almacenModel: AlmacenModel;
  public almacenForm: any;
  constructor(

    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private almacenService: AlmacenService,
    private crudHttpClientServiceShared: CrudHttpClientServiceShared
  ) {

    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );

  }

  ngOnInit() {
    this.buildForm();
    if (this.id != 0) {
      this.getAlmacen();
    } else {
      this.almacenModel = new AlmacenModel();
    }

  }

  getAlmacen() {
    this.crudHttpClientServiceShared.edit("almacen", "edit", this.id)
      .subscribe(
        res => {


        }
      )

  }

  buildForm() {
    this.almacenForm = this.formBuilder.group({
      idalmacen: ['0', Validators.required],
      dscalmacen: ['', Validators.required],
      direccion: ['', Validators.required]

    })

  }

  setForm(model: AlmacenModel) {
    this.almacenForm.controls['idalmacen'].setValue(model.idalmacen);
    this.almacenForm.controls['dscalmacen'].setValue(model.dscalmacen);
    this.almacenForm.controls['direccion'].setValue(model.direccion);
  }

  setModel(form: any) {
    this.almacenModel.idalmacen = form.controls['idalmacen'].value;
    this.almacenModel.dscalmacen = form.controls['dscalmacen'].value;
    this.almacenModel.direccion = form.controls['direccion'].value;

  }



  save() {

    this.setModel(this.almacenForm);
    this.sharedService.save(this.almacenModel, "almacen", "save")
      .subscribe(
        res => {
          this.msgPopup = [];
        /*   if (res.success == false) {
            this.msgPopup.push({ severity: 'error', summary: 'Aviso', detail: res.msg });
            return false;
          }

          this.msgPopup.push({ severity: 'success', summary: 'Aviso', detail: 'Registro Grabado !' });

          this.almacenModel.idalmacen = res.dataidalmacen;

          this.almacenForm.controls['idalmacen'].setValue(res.data.idalmacen); */


        }
      )
  }

}

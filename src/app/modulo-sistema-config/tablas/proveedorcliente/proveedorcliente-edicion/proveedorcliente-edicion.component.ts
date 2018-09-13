import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Message } from "primeng/primeng";

import { ProveedorclienteModel } from '../proveedorcliente-model';

import { ProveedorclientedireccionModel } from '../proveedorclientedireccion-model';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { ProveedorclienteService } from '../proveedorcliente.service';
import { debug } from 'util';

import swal from 'sweetalert2';
import { DocumentoidentificacionModel } from '../../../../modulo-cuenta-rr-hh/documentoidentificacion/documentoidentificacion-model';
import { CrudHttpClientServiceShared } from '../../../../shared/servicio/crudHttpClient.service.shared';
import { DocumentoidentificacionService } from '../../../../modulo-cuenta-rr-hh/documentoidentificacion/documentoidentificacion.service';




@Component({
  selector: 'ad-proveedorcliente-edicion',
  templateUrl: './proveedorcliente-edicion.component.html',
  styleUrls: ['./proveedorcliente-edicion.component.css'],
  providers: [ProveedorclienteService, DocumentoidentificacionService]
})
export class ProveedorclienteEdicionComponent implements OnInit {
  public suscription: any;
  public direccionForm: any;
  data: Observable<any>;
  public showDireccionAdd: boolean = false;
  public loadDocumentosDeIndentificacion: boolean = false;
  private msgPopup: Message[] = [];

  public proveedorclienteForm: any;
  public proveedorclienteModel: ProveedorclienteModel = new ProveedorclienteModel();

  public documentoidentificacionsModel: DocumentoidentificacionModel[] ;
  private sub: any;
  private id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private crudHttpClientServiceShared: CrudHttpClientServiceShared,
    private proveedorClienteService: ProveedorclienteService,
    private documentoidentificacionService: DocumentoidentificacionService
  ) {
    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );
  }

  ngOnInit() {
    this.buildForm();
    this.buildFormDireccion();
    this.observar();

  }

  buildForm() {
    this.proveedorclienteForm = this.formBuilder.group({
      idproveedorcliente: ['0'],
      razonsocial: ['', Validators.required],
      representante: ['', Validators.required],
      documentoidentificacion: ['', Validators.required],
      nrodocumento: ['', Validators.required],
      telefono: [''],
      email: [''],
      contacto1: [''],
      contacto2: [''],
      proveedorclientedireccions: ['']
    });

  }

  // setForm(model: ProveedorclienteModel) {
  //   this.proveedorclienteForm.controls['idproveedorcliente'].setValue(model.idproveedorcliente);
  //   this.proveedorclienteForm.controls['razonsocial'].setValue(model.razonsocial);
  //   this.proveedorclienteForm.controls['representante'].setValue(model.representante);
  //   this.proveedorclienteForm.controls['documentoidentificacion'].setValue(model.documentoidentificacion);
  //   this.proveedorclienteForm.controls['nrodocumento'].setValue(model.nrodocumento);
  //   this.proveedorclienteForm.controls['telefono'].setValue(model.telefono);
  //   this.proveedorclienteForm.controls['email'].setValue(model.email);
  //   this.proveedorclienteForm.controls['contacto1'].setValue(model.contacto1);
  //   this.proveedorclienteForm.controls['contacto2'].setValue(model.contacto2);
  //   //this.proveedorclienteForm.controls['proveedorclientedireccions'].setValue(model.proveedorclientedireccions);

  // }

  // setModel(form, model: ProveedorclienteModel) {
  //   model.idproveedorcliente = form.controls['idproveedorcliente'].value;
  //   model.razonsocial = form.controls['razonsocial'].value;
  //   model.representante = form.controls['representante'].value;
  //   model.documentoidentificacion = form.controls['documentoidentificacion'].value;
  //   model.nrodocumento = form.controls['nrodocumento'].value;
  //   model.telefono = form.controls['telefono'].value;
  //   model.email = form.controls['email'].value;
  //   model.contacto1 = form.controls['contacto1'].value;
  //   model.contacto2 = form.controls['contacto2'].value;
  //   //model.proveedorclientedireccions = form.controls['proveedorclientedireccions'].value;

  // }

  observar() {

    this.data = new Observable(
      observer => {
        this.getDocumentoidentificacion(observer)
      }
    );

    this.suscription = this.data.subscribe(

      value => {

        if (value == 1) {
          this.loadDocumentosDeIndentificacion = true;
        }

        if (this.loadDocumentosDeIndentificacion) {
          if (isNaN(this.id) || this.id == 0) {
            console.log("nuevo usuario")

            this.buildForm()
            this.proveedorclienteForm.controls['idproveedorcliente'].setValue(0);
          } else {
            console.log("edit usuario");

            this.edit(this.id)
          }
        }

      }

    )
  }



  getDocumentoidentificacion(obs: any) {
    this.documentoidentificacionService.getAll()
      .subscribe(
        result => {
         
          this.documentoidentificacionsModel = result.map(
            item=>{
           
              return new DocumentoidentificacionModel(item.iddocumentoidentificacion,item.dscdocumentoidentificacion,item.longitud)
            }
          )

          obs.next(1);
        }

      )
  }
  edit(id) {

    this.crudHttpClientServiceShared.edit(this.id, "proveedorcliente", "edit").subscribe(
      res => {

        debugger;
        this.proveedorclienteModel = new ProveedorclienteModel(
          res.idproveedorcliente,
          res.razonsocial,
          res.representante,
          res.documentoidentificacion==null? new DocumentoidentificacionModel(): new DocumentoidentificacionModel(res.documentoidentificacion.iddocumentoidentificacion, res.documentoidentificacion.dscdocumentoidentificacion,res.documentoidentificacion.longitud),
          res.nrodocumento,
          res.telefono,
          res.email,
          res.contacres,
          res.contacto2,

          res.proveedorclientedireccions == null ? Array(new ProveedorclientedireccionModel()) : res.proveedorclientedireccions.map(
            item => {

              return new ProveedorclientedireccionModel(item.idproveedorclientedireccion, item.direccion)
            }
          )

        );
        //debugger;
        this.buildForm();
        //this.setForm(this.proveedorclienteModel);

      },
      error => console.log(error),
      () => {
        console.log(this.proveedorclienteModel);
      }
    )


  }

  // editx(id) {

  //   this.sharedService.findById(id, "proveedorcliente", "edit")
  //     .subscribe(
  //     result => {

  //       this.proveedorclienteModel = [result.data].map(  item => {
  //         return new ProveedorclienteModel(
  //           item.idproveedorcliente,
  //           item.razonsocial,
  //           item.representante,
  //           item.documentoidentificacion,
  //           item.nrodocumento,
  //           item.telefono,
  //           item.email,
  //           item.contacto1,
  //           item.contacto2,
  //           item.proveedorclientedireccions
  //         )
  //       })[0];


  //       this.setForm(this.proveedorclienteModel);


  //       let proveedorclientedireccionsModelAux:ProveedorclientedireccionModel[] = [];
  //       proveedorclientedireccionsModelAux = this.proveedorclienteModel.proveedorclientedireccions
  //       .map( item => {
  //         return new ProveedorclientedireccionModel
  //         (
  //           item.idproveedorclientedireccion,
  //           item.direccion
  //         )
  //       })
  //       this.proveedorclienteModel.proveedorclientedireccions = proveedorclientedireccionsModelAux;




  //     },
  //     error => { console.log(error)},
  //     () => {

  //     }
  //     );
  // }


  newDireccion() {
    let proveedorclientedireccionModel = new ProveedorclientedireccionModel();

    proveedorclientedireccionModel.idproveedorclientedireccion = '';
    proveedorclientedireccionModel.direccion = '';


    this.setFormDireccion(proveedorclientedireccionModel)
    this.showDireccionAdd = true;
  }

  editDireccion(e) {
    this.setFormDireccion(e);
    this.showDireccionAdd = true;
  }

  addDireccion() {

    let proveedorclientedireccionModel = new ProveedorclientedireccionModel();
    proveedorclientedireccionModel.direccion = this.direccionForm.controls['direccion'].value;

    this.proveedorclienteModel.proveedorclientedireccions.push(proveedorclientedireccionModel);
    this.proveedorclienteModel.proveedorclientedireccions = this.proveedorclienteModel.proveedorclientedireccions.slice();

    this.showDireccionAdd = false;
  }

  buildFormDireccion() {
    this.direccionForm = this.formBuilder.group({
      idproveedorclientedireccion: ['0'],
      direccion: ['', Validators.required],
      proveedorcliente: ['']
    })
  }

  setFormDireccion(model: ProveedorclientedireccionModel) {

    this.direccionForm.controls['direccion'].setValue(model.direccion);
    this.direccionForm.controls['idproveedorclientedireccion'].setValue(model.idproveedorclientedireccion)

  }

  setModelDireccion(form: any) {
    let proveedorclientedireccion = new ProveedorclientedireccionModel();


  }

  create(){
    this.crudHttpClientServiceShared.create(this.proveedorclienteModel ,"proveedorcliente","create").subscribe(

      res=>{
        //this.vehiculoModel = new VehiculoModel(res.idVehiculo,res.numeroPlaca);
        //this.buildForm();
        //this.flagRefreshReturn = true;
      },
      error=>console.log(error),
      ()=>{
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Registro Creado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  update(){
    this.crudHttpClientServiceShared.update(this.proveedorclienteModel,"proveedorcliente","update").subscribe(

     
      res=>{
        //this.proveedorclienteModel = new VehiculoModel(res.idVehiculo,res.numeroPlaca);
        //this.buildForm();
        //this.flagRefreshReturn = true;
      },
      error=>console.log(error),
      ()=>{
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Registro Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )

  }

  /*   save(){
      this.sharedService.save(this.proveedorclienteModel, "proveedorcliente", "save")
      .subscribe(
      res => {
        this.msgPopup = [];
        if (res.success == false) {
          this.msgPopup.push({ severity: 'error', summary: 'Aviso', detail: res.msg });
          return false;
        }
  
        this.msgPopup.push({ severity: 'success', summary: 'Aviso', detail: 'Registro Grabado !' });
       
        this.proveedorclienteModel.idproveedorcliente = res.data.idproveedorcliente;
  
        this.proveedorclienteForm.controls['idproveedorcliente'].setValue(res.data.idproveedorcliente);
  
  
      }
      )
    } */
}

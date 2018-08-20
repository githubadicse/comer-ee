import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { isUndefined } from 'util';
import { UsuarioModel } from '../usuario-model';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { FilialService } from '../../filial/filial.service';
import { FilialModel } from '../../filial/filial-model';
import { PerfilServiceService } from '../../perfil/perfil-service.service';
import { PerfilModel } from '../../perfil/perfil-model';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css'],
  providers: [CrudHttpClientServiceShared, FilialService, PerfilServiceService]
})
export class UsuarioEditComponent implements OnInit {
  public dscfilial: string = "";
  public dscperfil: string = "";
  usuarioForm: any;
  flagRefreshReturn: boolean = false;
  id: any;
  sub: any;
  dbperfil: any;
  dbfilial: any;
  checkedActivo: boolean = true;
  myModel = false;
  public filialModel: FilialModel[];
  public perfilModel: PerfilModel[];
  public usuarioModel:UsuarioModel= new UsuarioModel();
  
  constructor(
    private filialService: FilialService,
    private perfilService: PerfilServiceService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudHttpClientServiceShared: CrudHttpClientServiceShared,
  ) {
    this.sub = this.activateRoute.params.subscribe(
      params => {
        this.id = +params['id'];
        if (isUndefined(params['flagRefresh'])) {
          return;
        }
      }
    );
  }
  ngOnInit() {
    this.buildForm();
    if(this.id != 0)
    this.edit();
    this.getFilial();
    this.getPerfil();
  }

  buildForm() {
    this.usuarioForm = this.formBuilder.group({
      idusuario: [this.usuarioModel.idusuario, Validators.required],
      nomusuario: [this.usuarioModel.nomusuario, Validators.required],
      dni: [this.usuarioModel.dni , Validators.required],
      login: [this.usuarioModel.login , Validators.required],
      clave: [this.usuarioModel.clave , Validators.required],
      activo: [this.checkedActivo , Validators.required],
      perfil: [this.usuarioModel.perfil , Validators.required],
      filial: [this.usuarioModel.filial , Validators.required],
      status: [this.usuarioModel.status , Validators.required]
    })
  }

  edit(){
    this.crudHttpClientServiceShared.edit(this.id,"usuario","edit").subscribe(
      res => {
        this.usuarioModel = new UsuarioModel(res.idusuario,res.nomusuario,res.dni,res.login,res.clave,res.activo,res.perfil,res.filial,res.status);
        this.usuarioForm.setValue(this.usuarioModel)
        this.checkedActivo = this.usuarioModel.activo;
      },
      error=>console.log(error),
      ()=>{
        console.log(this.usuarioModel);
      }
    )
  }

  create(){
    let data =  JSON.stringify(this.usuarioForm.value);
    this.crudHttpClientServiceShared.create(data,"usuario","create").subscribe(
      res=>{
        this.usuarioModel = new UsuarioModel(res.idusuario,res.nomusuario,res.dni,res.login,res.clave,res.activo,res.perfil,res.filial,res.status);
        this.usuarioForm.setValue(this.usuarioModel)
        this.flagRefreshReturn = true;
        this.usuarioForm.value.activo = this.checkedActivo === true ? 1 : 0;
        console.log(this.checkedActivo);
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
    let data =  JSON.stringify(this.usuarioForm.value);
    this.crudHttpClientServiceShared.update(data,"usuario","update").subscribe(
      res=>{
        this.usuarioModel = new UsuarioModel(res.idusuario,res.nomusuario,res.dni,res.login,res.clave,res.activo,res.perfil,res.filial,res.status);
        this.usuarioForm.setValue(this.usuarioModel);
        this.flagRefreshReturn = true;
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
  getFilial() {
    this.filialService.getFilial(this.dscfilial)
      .subscribe(
        res => {
          this.filialModel = res;
        }
      )
  }
  getPerfil() {

    this.perfilService.getPerfil(this.dscperfil)
      .subscribe(
        res => {
          this.perfilModel = res;
        }
      )
  }

  changeValue(e) {
    this.cargarData();
  }
  cargarData() {
    this.getFilial();
  }

  compararPerfil(c1: any, c2: any): boolean { return c1 && c2 ? c1.idperfil === c2.idperfil : c1 === c2; }
  compararFilial(c1: any, c2: any): boolean { return c1 && c2 ? c1.idfilial === c2.idfilial : c1 === c2; }
}
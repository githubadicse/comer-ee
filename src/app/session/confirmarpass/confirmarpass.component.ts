import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';
import { UsuarioModel } from '../../modulo-sistema-config/usuario/usuario-model';
import * as jwt_decode from "jwt-decode";
import { ConfigService } from '../../shared/config.service';
import swal from 'sweetalert2';
const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-confirmarpass',
  templateUrl: './confirmarpass.component.html',
  styleUrls: ['./confirmarpass.component.scss']
})
export class ConfirmarpassComponent implements OnInit {
  public form: FormGroup;
  usuarioForm: any;
  id: any;
  public usuarioModel:UsuarioModel= new UsuarioModel();
  flagRefreshReturn: boolean = false;
  checkedActivo: boolean = true;
  constructor( private configService:ConfigService, private fb: FormBuilder, private formBuilder: FormBuilder,private router: Router,  private crudHttpClientServiceShared: CrudHttpClientServiceShared,) { }

  ngOnInit() {
    this.buildForm();
    this.edit();
    this.form = this.fb.group( {
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      password: password,
      confirmPassword: confirmPassword
    } );
  }
  onSubmit() {
    this.router.navigate( ['/'] );
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
      filial: [this.usuarioModel.filial , Validators.required]
    
    })
  }

  edit(){
    let idusuario = this.configService.getIdUsuarioToken();
    this.crudHttpClientServiceShared.edit(idusuario,"usuario","edit").subscribe(
      res => {
        console.log("que trae eto",idusuario);
        this.usuarioModel = new UsuarioModel(res.idusuario,res.nomusuario,res.dni,res.login,res.clave,res.activo,res.perfil,res.filial);
        this.usuarioForm.setValue(this.usuarioModel)
        this.checkedActivo = this.usuarioModel.activo;
      },
      error=>console.log(error),
      ()=>{
        console.log(this.usuarioModel);
      }
    )
  }

  update(){
    let data =  JSON.stringify(this.usuarioForm.value);
    this.crudHttpClientServiceShared.update(data,"usuario","update").subscribe(
      res=>{

        this.usuarioModel = new UsuarioModel(res.idusuario,res.nomusuario,res.dni,res.login,res.clave,res.activo,res.perfil,res.filial);
        this.usuarioForm.setValue(this.usuarioModel);
        this.flagRefreshReturn = true;
      },
      error=>console.log(error),
      ()=>{
        // swal({
        //   position: 'top-end',
        //   type: 'success',
        //   title: 'Clave Actualizada',
        //   showConfirmButton: false,
        //   timer: 1500
        // })

      }
    )
  }

  getIdUsuarioToken():string{
    let idToken = localStorage.getItem("token");

    let decodificado = jwt_decode(idToken);

    return decodificado['idusuario'];
   
  }

}
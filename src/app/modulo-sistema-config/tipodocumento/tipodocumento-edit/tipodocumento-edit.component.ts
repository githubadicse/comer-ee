import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MSJ_SUCCESS } from '../../../shared/config.service.const';
import { TipodocumentoModel } from '../tipodocumento-model';
import { NumeradorModel } from '../numerador.model';


@Component({
  selector: 'ad-tipodocumento-edit',
  templateUrl: './tipodocumento-edit.component.html',
  styleUrls: ['./tipodocumento-edit.component.css'],
  providers: [CrudHttpClientServiceShared]
})
export class TipodocumentoEditComponent implements OnInit {
  tipoDoc_model : TipodocumentoModel = new TipodocumentoModel;
  numerador_model: any[] = []; 

  form: FormGroup;
  formSerie: FormGroup;
  procesando: boolean = false;  
  id: number = null;

  httpModel: string = 'tipodocumento';
  isEdit: boolean = false;  

  constructor(
    private crudService: CrudHttpClientServiceShared,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe(
    params => this.id = params['id']);
   }

  ngOnInit() {
    this.prepararFormulario();
    //this.maestros();
    if (this.id) {
      this.editar();
    }
  }


  private prepararFormulario(): void {   
    this.form = this.formBuilder.group({
      dscTipoDocumento: [this.tipoDoc_model.dscTipoDocumento, Validators.required],
      codigoSunat: [this.tipoDoc_model.codigoSunat, Validators.required],
      idTipoDocumento: this.tipoDoc_model.idTipoDocumento || 0,
      numeradors: this.tipoDoc_model.numeradors || null
    });

    this.formSerie = this.formBuilder.group({
      serie: ['', Validators.required],
      ultimoEmitido: ['', Validators.required],      
      idNumerador: 0      
    });


  }

  private editar(): void {
    this.crudService.edit(this.id, this.httpModel, 'edit').subscribe(res => {
      console.log(res);
      this.tipoDoc_model = <TipodocumentoModel>res;
      this.numerador_model = this.tipoDoc_model.numeradors || [];
      console.log(this.tipoDoc_model);
      
      this.prepararFormulario();
      this.isEdit = true;
    });
  }
  
  guardarCambios(): void {
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;
    
    //this.form.value.numeradors = this.numerador_model
    this.tipoDoc_model = <TipodocumentoModel>this.form.value;
    this.tipoDoc_model.numeradors = this.cocinarNumeradors(); 

    console.log(this.tipoDoc_model);
    this.crudService.create(this.tipoDoc_model, this.httpModel, 'save').subscribe(res => {
      setTimeout(() => {
        if (!this.isEdit) { this.prepararFormulario(); }
        swal(MSJ_SUCCESS); this.procesando = false;
      }, 800);
    });
  }

  

  /////////////// numerador
  /////////////////////////  
  public addNumerador(): void {
    if (!this.formSerie.valid) { return; }   
    const _numerador = new NumeradorModel(0, this.formSerie.value.serie, this.formSerie.value.ultimoEmitido,null);    
    this.numerador_model.push(_numerador);
    console.log(this.numerador_model);
    this.formSerie.reset();    
  }

  public removeNumerador(index: number): void {    
    this.numerador_model.splice(index,1);
  }

  private cocinarNumeradors(): NumeradorModel[]{
    let NumeradorsRpt: NumeradorModel[] = [];    
    NumeradorsRpt = this.numerador_model.map(x => new NumeradorModel(x.idNumerador, x.serie, x.ultimoEmitido, x.tipodocumento));
    console.log(NumeradorsRpt);
    return NumeradorsRpt;
  }
  
}
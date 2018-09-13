import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

import { UnidadmedidaModel } from '../../unidadmedida/unidadmedida-model';

import { MarcaArticuloModel } from '../../marca-articulo/marca-articulo-model';
import { ProductoModel } from '../model/producto.model';
import { CodigobarraModel } from '../../codigobarra/codigobarra-model';
import { ProductodetalleServiceService } from './productodetalle-service.service';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { CrudHttpClientServiceShared } from '../../../../shared/servicio/crudHttpClient.service.shared';
import { CategoriaArticuloModel } from '../../../../modulo-almacen/categoria-articulo/categoria-articulo-model';
import { MSJ_SUCCESS } from '../../../../shared/config.service.const';

@Component({
  selector: 'ad-productodetalle',
  templateUrl: './productodetalle.component.html',
  styleUrls: ['./productodetalle.component.css'],
  providers: [CrudHttpClientServiceShared, ProductodetalleServiceService]
})

export class ProductodetalleComponent implements OnInit {
  nomproducto: string = 'NUEVO PRODUCTO';

  productoModel: ProductoModel = new ProductoModel;

  dbListUnidad: any;
  dbListCategoria: any;
  dbListMarca: any;
  
  unidadmedidasModel: UnidadmedidaModel[];
  categoriasModel: CategoriaArticuloModel[];
  marcasModel: MarcaArticuloModel[];
  // codigoBarraModel: CodigobarraModel; 
  listCodigoBarras: CodigobarraModel[]=[];


  listMarcaFilter: any;

  form: FormGroup;
  procesando: boolean = false;
  id: number = null;

  httpModel: string = 'producto';

  isEdit: boolean = false;
  checkedActivo: boolean = true;

  ListImagenes: any = null;
  filesToUpload: Array<File> = [];
  imagenProducto: string = null;

  showChild: boolean = false;  
  showMarca: boolean = false;
  showCategoria: boolean = false;

  constructor(
    private crudService: CrudHttpClientServiceShared,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private productodetalleService: ProductodetalleServiceService,    
    private location: Location
  ) {
    this.activateRoute.params.subscribe(
      params => {
        this.id = params['id'];    
            
        const flagRefresh = !params['flagRefreshReturn'] ? false : true;
        if (flagRefresh) {

          if ( localStorage.getItem('marca')) {
            this.productoModel.marca = <MarcaArticuloModel>JSON.parse(localStorage.getItem('marca'));
            this.marcasModel.push(this.productoModel.marca);
            this.prepararFormulario();
            
            localStorage.removeItem('marca');
          }

          if ( localStorage.getItem('categoria')) {
            this.productoModel.categoria = <CategoriaArticuloModel>JSON.parse(localStorage.getItem('categoria'));
            this.categoriasModel.push(this.productoModel.categoria);
            this.prepararFormulario();
            
            localStorage.removeItem('categoria');
          }
        }

        this.showChild = false; 

      }) 
  }  

  ngOnInit() {
    this.prepararFormulario();
    this.maestros();
    if (this.id) {
      this.editar();
    }    
  }
  

  // Se utiliza para obtener el valor incial. Al editar el combo tiene que mostrar el valor que viene del back end
  compareMarca(c1: any, c2: any): boolean { return c1 && c2 ? c1.idmarca === c2.idmarca : c1 === c2; }
  compareCategoria(c1: any, c2: any): boolean { return c1 && c2 ? c1.idcategoria === c2.idcategoria : c1 === c2; }
  compareUndMedida(c1: any, c2: any): boolean { return c1 && c2 ? c1.idunidadmedida === c2.idunidadmedida : c1 === c2; }

  setAutoCompleteDatosFiltradosMarca(event: any): void { this.listMarcaFilter = event; }
  displayFnAutoCompleteMarca(marca?: any): string | undefined { return marca ? marca.dscmarca : undefined; }  

  private maestros(): void {
    this.crudService.getall('unidadmedida', 'getall').subscribe((res: any) => this.unidadmedidasModel = <UnidadmedidaModel[]>res.data);
    this.crudService.getall('marca', 'getall').subscribe((res: any) => this.marcasModel = <MarcaArticuloModel[]>res);
    this.crudService.getall('categoria', 'getall').subscribe((res: any) => {this.categoriasModel = <CategoriaArticuloModel[]>res;});
  }

  private prepararFormulario(): void {    
    this.form = this.formBuilder.group({
      idproducto: [{value: this.productoModel.idproducto || 0, disabled: true}],    
      dscproducto: [this.productoModel.dscproducto, Validators.required],
      dscproductocorto: [this.productoModel.dscproductocorto, Validators.required],
      marca: [this.productoModel.marca, Validators.required],
      categoria: [this.productoModel.categoria, Validators.required],
      unidadmedida: [this.productoModel.unidadmedida, Validators.required],
      precio1: [this.productoModel.precio1, Validators.required],
      precio2: [this.productoModel.precio2, Validators.required],
      precio3: [this.productoModel.precio3, Validators.required],
      codigobarras: [this.productoModel.codigobarras],
      activo: [this.checkedActivo, Validators.required],
      stockminimo: [this.productoModel.stockminimo, Validators.required],
    });
  }

  private editar(): void {
    this.crudService.edit(this.id, this.httpModel, 'edit').subscribe(res => {
      this.productoModel = <ProductoModel>res;   
      this.listCodigoBarras = this.productoModel.codigobarras || [];
      this.checkedActivo = this.productoModel.activo === 1 ? true : false;
      this.nomproducto = this.productoModel.dscproducto;
     
      this.isEdit = true;

      this.prepararFormulario();
      this.getImagenes();
    });
  }
  
  public guardarCambios(): void {
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;

    this.form.value.activo = this.checkedActivo === true ? 1 : 0;
    this.form.value.codigobarras = this.listCodigoBarras;
    this.form.value.idproducto = this.productoModel.idproducto || 0;
    this.productoModel = <ProductoModel>this.form.value;

    console.log(this.productoModel);
    // editar
    if (this.isEdit) { this.guardarEdicion(this.productoModel); return; }

    //guardar nuevo
    this.crudService.create(this.productoModel, this.httpModel, 'save').subscribe(res => {
      setTimeout(() => {        
        this.id = res.idproducto // para subir imagen si lo hubiera
        this.uploadImagenes();

        this.nuevoRegistro(); // resetear a valores iniciales
        this.prepararFormulario();
        swal(MSJ_SUCCESS); 
        this.procesando = false;
      }, 800);
    });
  }

  private guardarEdicion(_productoModel: ProductoModel): void {
    this.crudService.update(this.productoModel, this.httpModel, 'update').subscribe(res => {
      setTimeout(() => {   
        this.uploadImagenes();// para subir imagen si lo hubiera
        
        swal(MSJ_SUCCESS); 
        this.procesando = false;
      }, 800);
    });
  }

  // resetea los valores del formulario con los valores iniciales
  private nuevoRegistro(): void {
    this.productoModel = new ProductoModel; 
    this.ListImagenes = null;
    this.filesToUpload =[];
    this.imagenProducto = null;
  }


  /////---------- CODIGO DE BARRAS ----------/////

  addCodigoBarra(codigo: string){
    const codigoBarraModel = new CodigobarraModel(0,codigo);
    this.listCodigoBarras.push(codigoBarraModel);
  }

  removeCodigoBarra(index: number){
    this.listCodigoBarras.splice(index,1);
  }

  /////---------- CODIGO DE BARRAS ----------/////


  /////---------- IMAGENES ----------/////

  public obtnerImagenes(event: any): void{
    this.ListImagenes = [];    

    // para mostrar
    const files = event.target.files;    
    if (files) {
      for (let file of files) {      
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.ListImagenes.push(e.target.result);          
        }

        reader.readAsDataURL(file);
      }
    }

    // PARA GRABAR
    this.filesToUpload = <Array<File>>event.target.files;
  }

  public uploadImagenes(): void{    
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;    

    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]['name']);
    }

    formData.append('idproducto', this.id);    
    this.productodetalleService.guardarImagen(formData);
  }

  public getImagenes(): void {
    this.productodetalleService.getImage(this.id,'small').subscribe((res: any) => {
      this.imagenProducto = res.data ? 'data:image/jpeg;base64,' + res.data[0] : null;
      console.log(res);
    });
  }

  /////---------- IMAGENES ----------/////
    


  ShowChild() { this.showChild = this.showChild; }
  onActivateChild() { this.showChild = true; }
  onDeactivateChild() { 
    this.showChild = false;     
  }

  _getMarca(event){
    this.productoModel.marca = event.value;
    this.marcasModel.push(this.productoModel.marca);
    this.prepararFormulario();
    this.showMarca = false;
  }

  _getCategoria(event){
    this.productoModel.categoria = event.value;    
    this.categoriasModel.push(this.productoModel.categoria);
    this.prepararFormulario();
    this.showCategoria = false;
  }

}


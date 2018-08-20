import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MSJ_SUCCESS } from '../../../shared/config.service.const';


import { UnidadmedidaModel } from '../../unidadmedida/unidadmedida-model';
import { CategoriaArticuloModel } from '../../categoria-articulo/categoria-articulo-model';
import { MarcaArticuloModel } from '../../marca-articulo/marca-articulo-model';
import { ProductoModel } from '../model/producto.model';
import { CodigobarraModel } from '../../codigobarra/codigobarra-model';
import { ProductodetalleServiceService } from './productodetalle-service.service';

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

  constructor(
    private crudService: CrudHttpClientServiceShared,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private productodetalleService: ProductodetalleServiceService
  ) {
    this.activateRoute.params.subscribe(
      params => this.id = params['id']);
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
    


}




// import { ProductoModel } from '../model/producto.model';

// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';




// import { CodigobarraModel } from "../../codigobarra/codigobarra-model";
// import { CodigobarraService } from "../../codigobarra/codigobarra.service";
// import { Message } from "primeng/primeng";
// import { ProductodetalleServiceService } from "../../producto/productodetalle/productodetalle-service.service";


// import { CategoriaArticuloModel } from '../../categoria-articulo/categoria-articulo-model';
// import { CategoriaArticuloService } from '../../categoria-articulo/categoria-articulo.service';
// import { MarcaArticuloService } from '../../marca-articulo/marca-articulo.service';
// import { MarcaArticuloModel } from '../../marca-articulo/marca-articulo-model';
// import { UnidadmedidaModel } from '../../unidadmedida/unidadmedida-model';
// import { SharedService } from '../../../shared/servicio/shared.service';


// declare const $: any;

// @Component({
//   selector: 'ad-productodetalle',
//   templateUrl: './productodetalle.component.html',
//   styleUrls: ['./productodetalle.component.css'],
//   providers: [CategoriaArticuloService, MarcaArticuloService, SharedService, CodigobarraService, ProductodetalleServiceService]
// })

// export class ProductodetalleComponent implements OnInit {

//   private msgPopup: Message[] = [];

//   public productoForm: any;

//   public categoriasModel: CategoriaArticuloModel[];
//   public categoriaModel: CategoriaArticuloModel = new CategoriaArticuloModel();

//   public marcasModel: MarcaArticuloModel[];
//   public marcaModel: MarcaArticuloModel = new MarcaArticuloModel();

//   public unidadmedidaModel: UnidadmedidaModel;
//   public unidadmedidasModel: UnidadmedidaModel[];


//   public productoModel: ProductoModel = new ProductoModel();

//   public codigobarraModel: CodigobarraModel;
//   public codigobarrasModel: CodigobarraModel[] = [];

//   public _codigobarra: string = "";
//   private sub: any;
//   private id: number;
//   public token: any = 'Bearer ' + localStorage.getItem("token");

//   public imageSmall: string;
//   public imageLarge: string;

//   public urlCargarImagenes: string;
//   constructor(
//     private formBuilder: FormBuilder,
//     private categoriaService: CategoriaArticuloService,
//     private marcaService: MarcaArticuloService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private sharedService: SharedService,
//     private codigobarraService: CodigobarraService,
//     private productodetalleServiceService: ProductodetalleServiceService


//   ) { }

//   ngOnInit() {

   
//     this.urlImage();

//     this.sub = this.route.params.subscribe(
//       params => {
//         this.id = +params['id'];

//       }
//     );

//     this.buildForm();
//     this.getUnidadmedida();
//   }

//   urlImage() {
//     this.urlCargarImagenes = this.productodetalleServiceService.getUrlUploadImage();
//     console.log(this.urlCargarImagenes);

//   }

//   goBack() {

//     this.router.navigate(['ProductoComponent']);
//   }


//   buildForm() {

//     this.productoForm = this.formBuilder.group({
//       idproducto: [this.productoModel.idproducto],
//       dscproducto: [this.productoModel.dscproducto, Validators.required],
//       dscproductocorto: [this.productoModel.dscproductocorto, Validators.required],
//       unidadmedida: [this.productoModel.unidadmedida, Validators.required],
//       categoria: [this.productoModel.categoria, Validators.required],
//       marca: [this.productoModel.marca, Validators.required],
//       precio1: [this.productoModel.precio1, Validators.required],
//       precio2: [this.productoModel.precio2],
//       precio3: [this.productoModel.precio3],
//       stockminimo: [this.productoModel.stockminimo, Validators.required],
//       codigobarras: [this.productoModel.codigobarras == null ? '' : this.productoModel.codigobarras],
//       activo: [this.productoModel.activo],
//       exigevencimiento: [this.productoModel.exigevencimiento],
//       exigelote: [this.productoModel.exigelote]


//     });


//   }

//   save() {

//     let build = this.productoForm;
//     this.productoModel = build.getRawValue();
//     if (this.productoModel.activo)
//       this.productoModel.activo = 1;
//     else
//       this.productoModel.activo = 0;

//     if (this.productoModel.exigelote)
//       this.productoModel.exigelote = 1;
//     else
//       this.productoModel.exigelote = 0;

//     if (this.productoModel.exigevencimiento)
//       this.productoModel.exigevencimiento = 1;
//     else
//       this.productoModel.exigevencimiento = 0;



//     this.sharedService.save(this.productoModel, "producto", "save")
//       .subscribe(
//       res => {
//         this.msgPopup = [];
//         this.msgPopup.push({ severity: 'success', summary: 'Aviso', detail: 'Registro Grabado !' });

//         //this.productoModel.idproducto = res.idproducto;

//         //build.controls['idproducto'].setValue(res.idproducto);


//       }
//       )

//   }

//   getUnidadmedida() {
//     this.sharedService.getAll("unidadmedida", "getall")
//       .subscribe(
//       res => {
//         //this.unidadmedidasModel = res.data;
//         if (this.id > 0) {
//           this.edit(this.id)
//         } else {
//           this.productoModel = new ProductoModel();
//           this.buildForm();

//         }

//       }
//       )

//   }


//   edit(id) {

//     this.sharedService.findById(id, "producto", "findbyid")
//       .subscribe(
//       result => {
//         //this.productoModel = result.data;
//         debugger;
//         this.buildForm();
//         this.getImage(id, "small");
//       },
//       error => { },
//       () => {

//       }
//       );
//   }




//   agregarCodigoBarra(e) {
//     if (this._codigobarra != "") {

//       let codigobarraModel = new CodigobarraModel();

//       codigobarraModel.codigo = this._codigobarra;

//       this._codigobarra = "";

//       this.productoForm.controls["codigobarras"].value.push(codigobarraModel);


//     }
//   }

//   searchCategoria(event) {

//     let query = event.query;

//     if (query == undefined) {
//       query = "";
//     }
//     this.categoriaService.getCategoriaForDsc(query)
//       .subscribe(
//   /*     res => {
//         this.categoriasModel = res.data;
//         this.productoModel.categoria = this.categoriaModel;


//       } */
//       )
//   }

//   handleDropdownClickCategoria(event) {
//     this.categoriasModel = [];

//     //mimic remote call
//     setTimeout(() => {
//       this.searchCategoria("");
//     }, 100)
//   }

//   searchMarca(event) {
//     let query = event.query;

//     if (query == undefined) {
//       query = "";
//     }
//     this.marcaService.getMarcaForDsc(query)
//       .subscribe(
//       res => {
//         this.marcasModel = res;
//         this.productoModel.marca = this.marcaModel;

//       }
//       )
//   }

//   handleDropdownClickMarca(event) {
//     this.marcasModel = [];

//     //mimic remote call
//     setTimeout(() => {
//       this.searchMarca("");
//     }, 100)
//   }

//   generaCodigobarra() {
//     let codigo = this.productoForm.controls["idproducto"].value;
//     this.productodetalleServiceService.generaCodigobarra(codigo)
//       .subscribe(
//       result => {
//         //this._codigobarra = result.data;
//       }
//       )

//   }

//   onBeforeUpload(event) {

//     debugger;
//     event.xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem("token"));
//     event.formData.append('idproducto', this.productoForm.controls["idproducto"].value);

//   }
//   onUpload(event) {
//     this.getImage(this.productoForm.controls["idproducto"].value, "small");

//   }

//   getImage(idproducto, imageSize) {

//     if (!idproducto) {
//       return;
//     }
//     let src = "";
//     this.productodetalleServiceService.getImage(idproducto, imageSize)
//       .subscribe(
//       result => {
//       /*   src = result.data;


//         if (result.data.length > 0) {
//           let str = 'data:image/jpeg;base64,' + result.data[0];
//           switch (imageSize) {
//             case 'small':
//               this.imageSmall = str;
//               break;
//             case 'large':
//               this.imageLarge = str;
//               break;

//             default:
//               // code...
//               break;
//           }
//         } */

//       },
//       err => { console.log("error... al mostrar imagen...") }
//       , () => { console.log("completo subid ") }
//       );
//   }


 



// }

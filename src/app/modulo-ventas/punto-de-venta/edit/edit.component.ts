import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PuntoDeVentaModel } from '../punto-de-venta-model';
// import { SharedService } from '../../../shared/servicio/shared.service';
import { VentaComponentesService } from '../../componentes/venta-componentes.service';
import { ProductoModel } from '../../../modulo-sistema-config/tablas/producto/model/producto.model';




@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  msgPopup: any[];
  id: number;
  sub: any;

  @ViewChild('txtCantidad') txtCantidad: ElementRef;
  @ViewChild('txtProducto') txtProducto: ElementRef;

  exigeCliente = false;

  public puntoVentaModel: PuntoDeVentaModel;
  public puntoVentaForm: any;
  public ListaProducto: any[] = [];
  public hayProducto = false;
  public precioTotalPagar = 0;

  private ProductoSeleccionado: ProductoModel = null;

  public form: FormGroup;

  displayedColumns = ['#', 'producto', 'dsct', 'cantidad', 'precio', 'accion'];
  constructor(
    private formBuilder: FormBuilder,
    public ventaComponentesService: VentaComponentesService
    // private formBuilder: FormBuilder, private sharedService: SharedService,
    // private route: ActivatedRoute,
    // private router: Router,
  ) {
    // this.sub = this.route.params.subscribe(
    //   params => {
    //     this.id = +params['id'];


    //   }
    // );

  }

  ngOnInit() {
    // this.buildForm();
    // if(this.id != 0)
    // this.getPuntoVenta();
    this.prepararFormulario();
  }

  prepararFormulario(): void {
    this.form = this.formBuilder.group({
      producto: '',
      cantidad: ''
    });
  }

  _getObjectList(event: any) {
    this.ProductoSeleccionado = event;

    this.hayProducto = false;
      setTimeout(() => {
        this.txtCantidad.nativeElement.focus();
      }, 300);


  }

  private nuevoItem (): void {
    this.ProductoSeleccionado = null;
    this.form.reset();
    this.txtCantidad.nativeElement.value = '1';
    const comp_find_producto: any = document.querySelector('app-comp-find-producto-list input');
    comp_find_producto.focus();

    // this.txtProducto.nativeElement.focus();
  }

  AddProducto (cant: string): void {
    const cantidad = isNaN(parseFloat(cant)) ? 0 : parseFloat(cant);
    if (cantidad <= 0 || this.ProductoSeleccionado === null ) {return; }

    const dsct = 0;
    const precio = cantidad * this.ProductoSeleccionado.precio1;

    // buscar si producto existe
    // tslint:disable-next-line:prefer-const
    let indexProductoExiste: number;
    this.ListaProducto.map((x, index) => { if (x.producto.idproducto === this.ProductoSeleccionado.idproducto) { return indexProductoExiste = index; } });

    if (indexProductoExiste === undefined ) {// nuevo
      this.ListaProducto.push({ 'producto': this.ProductoSeleccionado, 'cantidad': cantidad, 'dsct': dsct, 'precio': precio });
    } else {// existe
      this.ListaProducto[indexProductoExiste].cantidad += cantidad;
      this.ListaProducto[indexProductoExiste].precio += precio;
    }
    this.ListaProducto = JSON.parse(JSON.stringify(this.ListaProducto));


    this.nuevoItem();
  }

  selectContent(): void {
    this.txtCantidad.nativeElement.select();
  }

  removeItem(index: number) {
    this.ListaProducto.splice(index, 1);
    this.ListaProducto = JSON.parse(JSON.stringify(this.ListaProducto));
    this.emitImportePagar();
  }

  emitImportePagar(): void {
    this.ventaComponentesService.setImporPagar(this.precioTotalPagar);
  }

  getPrecioTotal() {
    this.precioTotalPagar = this.ListaProducto.map(t => t.precio).reduce((acc, value) => acc + value, 0);
    if (this.precioTotalPagar >= 800 ) {
      this.ventaComponentesService.setExigeCliente(true);
    }

    this.emitImportePagar();
    return this.precioTotalPagar;
  }







  // getPuntoVenta() {
  //   this.sharedService.findById(this.id, "puntoventa", "findbyid")
  //     .subscribe(
  //     res => {
  //       let puntoVentaModelAux = new PuntoDeVentaModel();
  //       //puntoVentaModelAux = res.data;
  //       this.setForm(puntoVentaModelAux);
  //     }
  //     )

  // }

  // buildForm() {
  //   this.puntoVentaForm = this.formBuilder.group({
  //     idpuntoventa: ['0', Validators.required],
  //     dscpuntoventa: ['', Validators.required],
  //     mac: ['', Validators.required]
  //   })

  // }

  // setForm(model: PuntoDeVentaModel) {

  //   this.puntoVentaForm.controls['idpuntoventa'].setValue(model.idpuntoventa);
  //   this.puntoVentaForm.controls['dscpuntoventa'].setValue(model.dscpuntoventa);
  //   this.puntoVentaForm.controls['mac'].setValue(model.mac);

  // }

  // setModel() {
  //   this.puntoVentaModel = new PuntoDeVentaModel();
  //   this.puntoVentaModel.idpuntoventa = this.puntoVentaForm.controls['idpuntoventa'].value;
  //   this.puntoVentaModel.dscpuntoventa = this.puntoVentaForm.controls['dscpuntoventa'].value;
  //   this.puntoVentaModel.mac = this.puntoVentaForm.controls['mac'].value;

  // }

  // beforeSave(){
  //   this.setModel();
  //   this.save();
  // }


  // save() {


  //   this.sharedService.save(this.puntoVentaModel, "puntoventa", "save")
  //     .subscribe(
  //     res => {
  //       this.msgPopup = [];
  //    /*    if (res.success == false) {
  //         this.msgPopup.push({ severity: 'error', summary: 'Aviso', detail: res.msg });
  //         return false;
  //       }

  //       this.msgPopup.push({ severity: 'success', summary: 'Aviso', detail: 'Registro Grabado !' });

  //       this.puntoVentaModel.idpuntoventa = res.data.idpuntoventa;

  //       this.puntoVentaForm.controls['idpuntoventa'].setValue(res.data.idpuntoventa); */


  //     }
  //     )
  // }
}

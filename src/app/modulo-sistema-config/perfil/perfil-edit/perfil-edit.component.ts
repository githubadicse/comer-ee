import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MSJ_SUCCESS } from '../../../shared/config.service.const';

import { TreeNode } from 'primeng/api';


import { PerfilModel } from '../perfil-model';
import { PerfilDetalleModel } from '../perfil-detalle-model';
import { MenuService } from '../../../core/menu/menu.service';


@Component({
  selector: 'ad-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css'],
  providers: [CrudHttpClientServiceShared, MenuService]
})


export class PerfilEditComponent implements OnInit {
  perfil_model: PerfilModel;  
  perfil_detalle_model: PerfilDetalleModel[];

  form: FormGroup;
  procesando: boolean = false;
  id: number = null;

  httpModel: string = 'perfil';

  files: TreeNode[] = [];
  selectedFiles: TreeNode[] = [];
  arr: any[] = [];

  isEdit: boolean = false;
  loading: boolean = true; // laoding del TreeNode

  constructor(
    private crudService: CrudHttpClientServiceShared,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private menuService: MenuService
  ) {
    this.activateRoute.params.subscribe(
      params => this.id = params['id']);
  }

  ngOnInit() {
    this.prepararFormulario();
    this.maestros();
    if (this.id) {
      this.editar();
    } else { this.loading = false; }
  }

  private maestros(): void {
    // memu desde el menuservice
      const res: any = this.menuService.getAll();          
      let str: string = JSON.stringify(res);

      str = str.replace(/\"name\":/g, "\"label\":");
      this.files = <TreeNode[]>JSON.parse(str);
      console.log(this.files);   
  }

  // selecciona los permisos al cargar usuario existente
  flattenTree(node: TreeNode, nodosBD: any) {
    // parent's
    if (this.buscarNodo(nodosBD, node['idmenu'])) {
      this.arr.push(node);
    }

    if (node.children) {
      node.children.forEach(childNode => {
        if (this.buscarNodo(nodosBD, childNode['idmenu'])){
          this.arr.push(childNode);
          node.partialSelected = true;         
        }        
      });
    }
  }

  private buscarNodo(listNodos: any, idmenu: string):boolean {
    const rpt = listNodos.filter(n => n.idmenu === idmenu).length > 0 ? true : false;
    return rpt;
  }

  private prepararFormulario(): void {
    this.form = this.formBuilder.group({
      dscperfil: ['', Validators.required],
      idfilial: 1,
      idperfil: 0,
      perfilesdetalles: this.perfil_detalle_model
    });
  }

  /// recorre los elemento seleccionados adicionandoles el padre si no lo tienen
  private cocinarMenuSeleccionados(): PerfilDetalleModel[] {
    console.log('selectedFiles', this.selectedFiles);
    this.selectedFiles.map((x: any) => {      
      let padre: any;
      let findPadre: number;

      if (x.parent) {
        padre = x.parent;
        findPadre = this.selectedFiles.filter((z: any) => z.idmenu === padre.idmenu).length;
        if (findPadre === 0) { this.selectedFiles.push(padre); }
      }
    });


    return this.selectedFiles.map((row: any) => {      
      return new PerfilDetalleModel(null, row.idmenu);
    });
  }

  private editar(): void {
    this.crudService.edit(this.id, this.httpModel, 'edit').subscribe((res: any) => {      
      this.form.setValue(res);
      this.perfil_detalle_model = <PerfilDetalleModel[]>res.perfilesdetalles || null;
      this.loading = false; // laoding del TreeNode 


      // selecciona los accesos al cargar usuario      
      this.files.map(f => this.flattenTree(f, this.perfil_detalle_model))
      this.selectedFiles = this.arr;
      this.isEdit = true;

    });
  }

  guardarCambios(): void {
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;
    this.form.value.perfilesdetalles = this.cocinarMenuSeleccionados();
    this.perfil_model = <PerfilModel>this.form.value;

    console.log(this.perfil_model);

    this.crudService.create(this.perfil_model, this.httpModel, 'save').subscribe(res => {
      console.log(res);
      setTimeout(() => {
        if (!this.isEdit) { 
          this.prepararFormulario();
        }
        swal(MSJ_SUCCESS); this.procesando = false;
      }, 800);
    });
  }
}

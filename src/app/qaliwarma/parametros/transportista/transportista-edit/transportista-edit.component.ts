import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { TransportistaModel } from '../transportista-model';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { CrudHttpClientServiceShared } from '../../../../shared/servicio/crudHttpClient.service.shared';
import { ProveedorclienteService } from '../../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente.service';
import { ProveedorclienteModel } from '../../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model';



@Component({
  selector: 'app-transportista-edit',
  templateUrl: './transportista-edit.component.html',
  styleUrls: ['./transportista-edit.component.css'],
  providers: [ProveedorclienteService, CrudHttpClientServiceShared]
})
export class TransportistaEditComponent implements OnInit {


  flagRefreshReturn: boolean = false;
  public proveedorclientesModel: ProveedorclienteModel[] = [];
  public transportistaModel: TransportistaModel = new TransportistaModel();
  sub: any;
  id: any;
  transportistaForm: any;

  constructor(private proveedorclienteService: ProveedorclienteService,
    private crudHttpClientServiceShared: CrudHttpClientServiceShared,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
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
    this.getProveedorClientes();

    if (this.id != 0)
      this.edit();
    else
      this.transportistaModel.idTransportista = 0;

    this.buildForm();
  }

  buildForm() {
    this.transportistaForm = this.formBuilder.group({
      idTransportista: [this.transportistaModel.idTransportista, Validators.required],
      proveedorcliente: [this.transportistaModel.proveedorcliente, Validators.required]

    })
  }

  getProveedorClientes() {
    this.proveedorclienteService.getall().subscribe(
      res => {
        this.proveedorclientesModel = res.map(
          item => {
            return new ProveedorclienteModel(item.idproveedorcliente, item.razonsocial)
          }
        )

        this.proveedorclientesModel.sort((a, b) => {
          return a.razonsocial < b.razonsocial ? -1 : 1;
        })
      },
      error => {

      },
      () => {
        console.log(this.proveedorclientesModel)
      }
    )
  }

  refreshModel(res) {


    this.transportistaModel = new TransportistaModel(
      res.idTransportista,
      res.proveedorcliente == null ? new ProveedorclienteModel() : new ProveedorclienteModel(res.proveedorcliente.idproveedorcliente, res.proveedorcliente.razonsocial)
    );

  }

  edit() {

    this.crudHttpClientServiceShared.edit(this.id, "transportista", "edit").subscribe(
      res => {

        this.refreshModel(res);
        this.buildForm();

      },
      error => console.log(error),
      () => {
        console.log(this.transportistaModel);
      }
    )


  }


  create() {
    this.crudHttpClientServiceShared.create(this.transportistaModel, "transportista", "create").subscribe(

      res => {
        this.refreshModel(res);

        this.buildForm();
        this.flagRefreshReturn = true;
      },
      error => console.log(error),
      () => {
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

  update() {
    this.crudHttpClientServiceShared.update(this.transportistaModel, "transportista", "update").subscribe(


      res => {
        this.refreshModel(res);
        this.buildForm();
        this.flagRefreshReturn = true;
      },
      error => console.log(error),
      () => {
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

}

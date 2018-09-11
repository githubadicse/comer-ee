import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/servicio/shared.service';

import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import swal from 'sweetalert2';
import { MSJ_ALERT_BORRAR, MSJ_SUCCESS } from '../../../shared/config.service.const';
import { Table } from 'primeng/table';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';

@Component({
  selector: 'ad-tipodocumento-grid',
  templateUrl: './tipodocumento-grid.component.html',
  styleUrls: ['./tipodocumento-grid.component.css'],
  providers: [SharedService, CrudHttpClientServiceShared]
})
export class TipodocumentoGridComponent implements OnInit {
  public titulo: string = "Tipos de documentos";

  public db_tipoDocumento: any;
  public showChild: boolean = false;
  public ShowBuqueda: boolean = false;

  @ViewChild('dt') dataTable: Table;
  public Typeahead = new Subject<string>();
  public filterPage: any;
  public filtrosActivos: any;
  public totalRecords: number;
  public http_model = 'tipodocumento';


  constructor(
    private sharedService: SharedService,
    private crudService: CrudHttpClientServiceShared
  ) { }

  ngOnInit() {
    this.maestros();
    this.initObservable();
  }

  private initObservable(): void {
    this.Typeahead.pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((res: any) => {
        const value = res[0]; const field = res[1]; const operator = res[2];
        this.dataTable.filter(value, field, operator);
      });
  }

  private maestros(): void {
    this.crudService.getall(this.http_model, 'getall').subscribe((res: any) => { this.db_tipoDocumento = res; this.totalRecords = res.totalCount; console.log(res);});
  }

  public borrarRegistro(data: any): any {
    swal(MSJ_ALERT_BORRAR).then((res: any) => {
      if (res.value) {
        this.crudService.delete(data.idTipoDocumento, this.http_model, 'delete').subscribe(res => {
          swal(MSJ_SUCCESS);
          // this.refreshModel(this.filtrosActivos); // cuando [lazy]="true"
          this.maestros();
        });
      }
    });
  }

  onActivateChild() { this.showChild = true; }
  onDeactivateChild() {
    this.showChild = false;
    if (this.sharedService.refreshByStorage(this.http_model)) { this.maestros() }
  }


}
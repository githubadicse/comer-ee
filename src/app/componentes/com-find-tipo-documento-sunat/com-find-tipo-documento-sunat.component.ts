import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ComFindTipoDocumentoSunatService } from './com-find-tipo-documento-sunat.service';
import { TipodocumentoModel } from '../../modulo-sistema-config/tipodocumento/tipodocumento-model';

@Component({
  selector: 'app-com-find-tipo-documento-sunat',
  templateUrl: './com-find-tipo-documento-sunat.component.html',
  styleUrls: ['./com-find-tipo-documento-sunat.component.scss']
})
export class ComFindTipoDocumentoSunatComponent implements OnInit, OnDestroy  {
  @Input('SelectValorInicial') selectedValueInitial: any = null; // valor inicial
  @Input() filtros: string = ""; // filtros
  @Input() mostrarSeries: boolean = false; // se muestra la serie y el ultimo correlativo
  @Input() disabledSerie: boolean = false; // deshabilitar select serie, no modificable
  @Input('selectSerie') selectSerie: number = null; // serie seleccioada

  @Output() onChange = new EventEmitter<any>(null);
  

  public listTipoDocumentModel: TipodocumentoModel[] = [];
  public listSeries: any[] = [];
  public selectedValueTipoDoc: TipodocumentoModel;
  public selectedValueSerie: number;
  public numeroCorrelativo: number = null;
    
  private rpt: ComTipoDocumentoRespuesta = new ComTipoDocumentoRespuesta;
  

  constructor(private comFindTipoDocumentoSunatService: ComFindTipoDocumentoSunatService ) {
    this.comFindTipoDocumentoSunatService.filtros = this.filtros;
  }
    
  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    
  }

  // para cuando se requiera cambiar dinamicamente los filtros  
  ngOnChanges(changes: SimpleChanges): void {    
    if (changes.hasOwnProperty('filtros')) {
      this.comFindTipoDocumentoSunatService.filtros = changes['filtros'].currentValue;
      this.loadData();
    }
  }
  
  private loadData(): void {
    this.comFindTipoDocumentoSunatService.getAllFilter()
      .subscribe((res: any[]) => {
        console.log('Documentos', res);        
        
        this.selectedValueTipoDoc = this.selectedValueInitial === 1 ? res[0] || null : this.selectedValueInitial;
        
        // si es valor inicial es null y en la lista solo existe un elemento muestra, entonces muestra el unico elemento
        this.selectedValueTipoDoc = (res.length === 1 && !this.selectedValueTipoDoc) ? res[0] : this.selectedValueTipoDoc;               
        this.listTipoDocumentModel = <TipodocumentoModel[]>res;
        
        //Series
        const tipoDocSelectSerie = res.filter(x => x.numeradors).filter(x => x.idTipoDocumento === this.selectedValueTipoDoc.idTipoDocumento )
        
        this.rpt.tipoDocumento = this.selectedValueTipoDoc;        

        this.changeSelect(tipoDocSelectSerie[0]);                                
      });
  }

  public changeSelect(tipoDocumento: any): void {
    console.log(tipoDocumento);    
    //this.onChange.emit(tipoDocumento);

    // series numeradores
    this.numeroCorrelativo = null;
    this.rpt.numerador = null;

    this.listSeries = tipoDocumento.numeradors || null;
    if (this.listSeries) { //seleccionar la serie si existe numeradores
      this.selectedValueSerie = !this.selectSerie ? this.listSeries[0].serie : this.selectSerie;

      this.listSeries.filter(x => x.serie === this.selectedValueSerie).map(x => { 
        this.rpt.numerador = x;
        this.numeroCorrelativo = x.ultimoEmitido + 1
      });
    }    
    
    this.rpt.tipoDocumento = tipoDocumento;    
    this.rpt.correlativo = this.numeroCorrelativo;
    this.onChange.emit(this.rpt);
    ///
  }

  public changeSelectSerie(Numerador): void {
    console.log(Numerador);
    this.numeroCorrelativo = Numerador.ultimoEmitido + 1;

    this.rpt.numerador = Numerador;
    this.rpt.correlativo = this.numeroCorrelativo;
    this.onChange.emit(this.rpt);
  }

  // compara los valores del select para devolver la primera coicidencia // se usa para valor incial o para mostrar la seleccion recibida
  compareRow = (val1: TipodocumentoModel, val2: TipodocumentoModel) => { if (val2) { return val1.idTipoDocumento === val2.idTipoDocumento;}}
  
  // solo compara el numero de serie
  compareRowSerie = (val1: any, val2: number ) => { if (val2) { return val1.serie === val2;}} 
  

}

export class ComTipoDocumentoRespuesta {
  constructor(
    public tipoDocumento: TipodocumentoModel = null,
    public numerador: any = null,
    public correlativo: number = null
  ) {
    
  }
}
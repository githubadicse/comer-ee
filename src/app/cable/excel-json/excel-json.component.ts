import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfigService } from '../../shared/config.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-excel-json',
  templateUrl: './excel-json.component.html',
  styleUrls: ['./excel-json.component.scss']  
})
export class ExcelJsonComponent implements OnInit {
  private fileSelect: any;
  public nomFile: string = '';
  public procesando: boolean = false;
  public filesToUpload: any[] = [];
  public resServicio: any = null;


  @ViewChild('txt_console') txt_console: ElementRef;

  constructor(
    private configService:ConfigService,
    private httpClient:HttpClient
  ) { }

  ngOnInit() {

  }

  recibirFile(e: any): void{
    this.fileSelect = e;    
    console.log(e);    
    this.nomFile = this.fileSelect.target.files[0] ? 'Archivo Seleccionado: '+this.fileSelect.target.files[0].name : '';    
  }

  procesar(): void{    
    this.procesando = true;
    this.procesarFile(this.fileSelect, (rpt)=> {
      this.cocinarJsonComprobantes(rpt);
    })  
  }

  private procesarFile(e: any, callback): void {                
    let files = e.target.files, f = files[0];
    let reader = new FileReader();
    let data: any;

    reader.onload = function(e: any) {
      const bstr: string = e.target.result;
      const wb: XLSX.IWorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.IWorkSheet = wb.Sheets[wsname];

      /* save data */
      data = XLSX.utils.sheet_to_json(ws, {raw: true});      
      // console.log(data);

      callback(data);
         
    };
    reader.readAsBinaryString(f);        
    
  }

  private cocinarJsonComprobantes(data: any): void{
    let data_json: any[] = [];    
    this.filesToUpload = [];
    this.txt_console.nativeElement.value = '';
    this.resServicio = null;

    data.map(row => {      
      
      if (!row['Tipo']) {return; }
      const cliente = row['RUC'] === "''" ? 'PUBLICO GENERAL.' : row['Cliente'];
      const ruc = row['RUC'] === "''" ? '' : row['RUC'];

      row['Cliente'] = cliente;
      row['RUC'] = ruc;

      let abrDocumento: string = '';
      let abrDocumentoNomFile: string = '';
      let idDocumento: number = 1;

      switch (row['Tipo']) {
        case "FAC":
          abrDocumento = "FA";
          abrDocumentoNomFile = "F"      
          idDocumento = 1;
          break;
        case "BOL":
          abrDocumento = "BE";
          abrDocumentoNomFile = "B"      
          idDocumento = 2;
          break;
        default: // solo facturas y boletas
          return;
      }

      row['abrDocumento'] = abrDocumento;
      row['abrDocumentoNomFile'] = abrDocumentoNomFile;
      row['idDocumento'] = idDocumento;

      this.setJsonComprobante(row);
      
    })
    
    this.uploadImagenes();
  }

  private setJsonComprobante (row: any): void {
    const json_string = `({
      "fecha": "${row['F. Pago']}",
      "cliente": {
        "ruc": "${row['RUC']}",
        "razonSocial": "${row['Cliente']}",
        "idCliente": 102007,
        "direccion": "${row['Plano'] + ' ' +row['Sector'] }",
        "facturaCabs": null
      },
      "tipoDocumento": {
        "idDocumento": ${row['idDocumento']},
        "abrDocumento": "${row['abrDocumento']} ",
        "facturaCabs": null
      },
      "numero": "${row['Numero']}",
      "igvPorcentaje": 0,
      "emisorRazonsocial": "${row['Codigo de Serie']}",
      "emisorRuc": "20209098114",
      "serie": "${row['Serie']}",
      "emisorDireccion": "JR. ALONSO DE ALVARADO 770",
      "id": "${this.randomId()}",
      "facturaDetalles": [{
        "idFactuaDetalle": "${this.randomId()}",
        "precioUnitario": "${row['Precio Venta']}",
        "producto": {
          "dscProducto": "${row['Detalle Deuda'] || 'SERVICIO DE CABLE TELEVISION'}",
          "idProducto": 1
        },
        "cantidad": 1,
        "facturaCab": null
      }],
      "flagArchivoFacturador": 0
    })`;
      

    const row_json = JSON.parse(JSON.stringify(eval(json_string.trim())));

    // crea el txt con el json
    const nomFile = `20601449910-0${row['idDocumento']}-${row['abrDocumentoNomFile'] + row['Serie']}-${row['Numero']}.txt`;    
    const file_upload = new File([JSON.stringify(row_json)], nomFile, {type: "text/plain;charset=utf-8"});
      
    //consola        
    this.txt_console.nativeElement.value += nomFile+"\n";
    this.txt_console.nativeElement.scrollTop = this.txt_console.nativeElement.scrollHeight;

    this.filesToUpload.push(file_upload);    

  }

  private uploadImagenes(): void{    
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;    

    for (let i = 0; i < files.length; i++) {
      formData.append("file[]", files[i], files[i]['name']);
    }
    
    this.guardarImagen(formData);
  }

  private guardarImagen(formData: FormData): void{
    let url = this.configService.getUrlSecurityRes("uploadtxtcomprobante", "upload");
    this.httpClient.post<any>(url, formData).subscribe(res => {
      this.procesando=false;
      this.resServicio = res;
      this.txt_console.nativeElement.value += JSON.stringify(res);
    });

  }

  private randomId(): string {
    return Math.random().toString(36).replace(/[a-zA-Z0-9]+/g, '').substr(0, 8);
  }



}

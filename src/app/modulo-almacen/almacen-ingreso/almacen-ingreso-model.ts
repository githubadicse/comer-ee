import { AlmacenIngresoDetalleModel } from "./almacen-ingreso-detalle-model";
import { EmpleadoModel } from "../../modulo-cuenta-rr-hh/empleado/empleado-model";
import { PeriodoalmacenModel } from "../periodoalmacen/periodoalmacen-model";
import { TipodocumentoModel } from "../../modulo-sistema-config/tipodocumento/tipodocumento-model";
import { ProveedorclienteModel } from "../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model";
import { AlmacenModel } from "../../modulo-sistema-config/tablas/almacen/almacen-model";
import { MotivoIngresoModel } from "../../modulo-sistema-config/tablas/motivo-ingreso/motivo-ingreso-model";



export class AlmacenIngresoModel {
    constructor(
        
        public iding001:number=0,
        public fecha:String=null,
        public hora:String = null,
        public proveedorcliente:ProveedorclienteModel =null,
        public almacen:AlmacenModel= null ,
        public nrodoc:number=null,
        //public com001:any=null,
        public empleado:EmpleadoModel=null,
        public glosa:string=null,
        // public fechahorasys:String=null,
        //public condicionrelacioncompra:any = null,
        
        public periodoalmacen:PeriodoalmacenModel=null,
        public motivoingreso:MotivoIngresoModel =null,
        //public idtraslado:number=null,
        public tipodocumento:TipodocumentoModel=null,
        public seriedocproveedor:string=null,
        public nrodocproveedor:string=null,
       
        public ing002s:AlmacenIngresoDetalleModel[]=[],
        //public traslado:any=null
        
       

 
    ){

    }
}

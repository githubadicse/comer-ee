import { AlmacenModel } from "../modulo-sistema-config/tablas/almacen/almacen-model";
import { MonedaModel } from "../modulo-sistema-config/tablas/moneda/moneda-model";
import { ProveedorclienteModel } from "../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model";
import { TipodocumentoModel } from "../modulo-sistema-config/tipodocumento/tipodocumento-model";
import { ModalidadCompraVentaModel } from "../modulo-sistema-config/tablas/modalidad-compra-venta/modalidad-compra-venta-model";
import { CompraDetalleModel } from "./compra-detalle-model";

export class CompraModel {

    constructor(
        public idcom001:number = 0,
        public proveedorclienteModel:ProveedorclienteModel=null,
        public fechaEmision:string = null,
        public tipodocumento:TipodocumentoModel=null,
        public documentoSerie:string = null,
        public documentoNumero:string = null,
        public fechaVencimiento:string=null,
        public almacen:AlmacenModel = null,
        public importeIsc:number = 0,
        public importeBruto:number = 0,
        public importeIgvPorcentaje:number = 0,
        public importeIgv:number = 0,
        public importeCompra:number = 0,
        public tipoCambio:number = 0,
        public importePagos:number = 0,
        public modalidadCompraVenta:ModalidadCompraVentaModel = null,
        public flagGeneraFromNotaIngreso:boolean=false,
        public fechaRegistroSystema:string=null,
        public idUsuarioCrea:number=null,
        public fechaRegistroSystemaModifica:string=null,
        public idUsuarioModifica:number=null,
        public com002s:CompraDetalleModel = null,

    ){

    }
}

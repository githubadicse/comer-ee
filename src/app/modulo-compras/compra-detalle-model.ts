import { ProductoModel } from "../modulo-sistema-config/tablas/producto/model/producto.model";
import { CompraModel } from "./compra-model";
import { CompraDetalleRelacionModel } from './compra-detalle-relacion.model';

export class CompraDetalleModel {

    constructor(
        public idcom002:string = '',
        public com001:CompraModel = null,
        public producto:ProductoModel = null,
        public cantidad:number = 0,
        public importeIsc:number=0,
        public importeBruto:number =0,
        public importeDescuento:number=0,
        public importeValorCompra:number=0,
        public importePorcentajeIgv:number=0,
        public importeIgv:number=0,
        public importeCompra:number=0,
        public importeFlete:number=0,
        public importeUnitario:number=0,
        public importeTotalCostoUnitario=0,
        public ing001Com002Relacions: CompraDetalleRelacionModel[] = null
    ){

    }
}

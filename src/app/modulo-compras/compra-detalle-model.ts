import { ProductoModel } from "../modulo-sistema-config/tablas/producto/model/producto.model";

export class CompraDetalleModel {

    constructor(
        public idcom002:string = '',
        public idcom001:number = null,
        public producto:ProductoModel = null,
        public cantidad:number = 0,
        public importeIsc:number=0,
        public importeBruto:number =0,
        public importeDescuento:number=0,
        public importeValorCompra:number=0,
        public importePorcentajeIgv:number=0,
        public importeIgv:number=0,
        public importeCompra:number=0,
        public importeFlte:number=0,
        public importeUnitario:number=0,
        public importeTotalCostoUnitario=0
    ){

    }
}
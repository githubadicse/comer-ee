import { AlmacenIngresoModel } from "./almacen-ingreso-model";
import { ProductoModel } from "../../modulo-sistema-config/tablas/producto/model/producto.model";



export class AlmacenIngresoDetalleModel {

    constructor(
        public iding002:string=null,
        public ing001:AlmacenIngresoModel=null,
        public producto:ProductoModel=null,
        public cantidad:number=0,
        public item:number=0,
        public nrolote:string=null,
        public peso:number=0,
        public fechavencimiento:Date=null
    

    ){

    }
}

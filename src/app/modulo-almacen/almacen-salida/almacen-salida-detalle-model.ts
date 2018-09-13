import { AlmacenSalidaModel } from "./almacen-salida-model";
import { ProductoModel } from "../../modulo-sistema-config/tablas/producto/model/producto.model";



export class AlmacenSalidaDetalleModel {

    constructor(
        public idsalida002:string=null,
        public salida001:AlmacenSalidaModel=null,
        public producto:ProductoModel=null,
        public cantidad:number=0,
        public item:number=0,
        public nrolote:string=null,
        public peso:number=0,
        public fechavencimiento:Date=null

    ){

    }
}

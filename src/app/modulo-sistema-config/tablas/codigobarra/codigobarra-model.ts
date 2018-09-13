import { ProductoModel } from "../producto/model/producto.model";



export class CodigobarraModel {

    constructor(
        public idcodigobarra:any = null,
        public codigo:string="",
        public producto:ProductoModel=null
       
    ){

    }
}

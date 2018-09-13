import { UnidadmedidaModel } from "../../modulo-sistema-config/tablas/unidadmedida/unidadmedida-model";
import { ProductopresentacionModel } from "../../modulo-sistema-config/tablas/producto/model/productopresentacion.model";



export class CatalogoProductoModel {

    constructor(
        public idCatalogoProductoQaliwarma:string="",
        public dscCatalogoProductoQaliwarma=null,
        public unidadmedida:UnidadmedidaModel=null,
        public productoPresentacions:ProductopresentacionModel[]=null,
        public entrega1:boolean=null,
        public entrega2:boolean=null,
        public entrega3:boolean=null,
        public entrega4:boolean=null,
        public entrega5:boolean=null,
        public entrega6:boolean=null,
        public entrega7:boolean=null,
        public entrega8:boolean=null,
        public entrega9:boolean=null,
        public entrega10:boolean=null,
        public entrega11:boolean=null,
        public entrega12:boolean=null
    )
    {

    }
}

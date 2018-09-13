import { ProductoPorNumeroEntregaModel } from "../producto-por-numero-entrega/producto-por-numero-entrega-model";


import { ProductoPresentacionModel } from "../producto-presentacion/producto-presentacion-model";
import { CatalogoLoteModel } from "../catalogo-lote/catalogo-lote-model";
import { MarcaArticuloModel } from "../../modulo-sistema-config/tablas/marca-articulo/marca-articulo-model";


export class CatalogoMarcaModel {

    constructor(
        public idCatalogoMarca:String = null,
        public dscCatalogoMarca:String = null,
        public productoPorNumeroEntrega:ProductoPorNumeroEntregaModel=null,
        public marca:MarcaArticuloModel=null,
        public productoPresentacion:ProductoPresentacionModel=null,
        public catalogoLotes:CatalogoLoteModel[]=null

    ){

    }

  

}






import { MarcaArticuloModel } from '../../marca-articulo/marca-articulo-model';
import { CodigobarraModel } from '../../codigobarra/codigobarra-model';
import { UnidadmedidaModel } from '../../unidadmedida/unidadmedida-model';
import { ProductopresentacionModel } from './productopresentacion.model';
import { CategoriaArticuloModel } from '../../../../modulo-almacen/categoria-articulo/categoria-articulo-model';

export class ProductoModel {
    constructor(
        public idproducto:number=0,
        public dscproducto:string="",
        public dscproductocorto:string="",
        public unidadmedida:UnidadmedidaModel = null,
        public categoria:CategoriaArticuloModel = null,
        public marca:MarcaArticuloModel = null,
        public precio1:number=0,
        public precio2:number=0,
        public precio3:number=0,
        public stockminimo:number=0,
        public codigobarras:CodigobarraModel[]=[],
        public activo:number = 0,
        public exigevencimiento:number=0,
        public exigelote:number=0
        

    ){

    }
}

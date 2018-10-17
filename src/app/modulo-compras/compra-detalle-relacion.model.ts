import { AlmacenIngresoModel } from '../modulo-almacen/almacen-ingreso/almacen-ingreso-model';
import { CompraDetalleModel } from './compra-detalle-model';

export class CompraDetalleRelacionModel {
    constructor(
        public idIng001Com002Relacion:string = '',
        public ing001:AlmacenIngresoModel = null,
        public com002:CompraDetalleModel = null        
    ){

    }
}

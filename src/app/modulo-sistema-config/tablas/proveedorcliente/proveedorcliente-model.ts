import { ProveedorclientedireccionModel } from './proveedorclientedireccion-model';
import { DocumentoidentificacionModel } from '../../../modulo-cuenta-rr-hh/documentoidentificacion/documentoidentificacion-model';



export class ProveedorclienteModel {
 

    constructor(
        public idproveedorcliente:number=0,
        public razonsocial:string=null,
        public representante:string=null,
        public documentoidentificacion:DocumentoidentificacionModel=null,
        public nrodocumento:string=null,
        public telefono:string=null,
        public email:string=null,
        public contacto1:string=null,
        public contacto2:string=null,
        public proveedorclientedireccions:ProveedorclientedireccionModel[]=null


    ){

    }

 
}

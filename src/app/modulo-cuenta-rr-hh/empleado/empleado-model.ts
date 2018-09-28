import { UsuarioEmpleadoModel } from "../../modulo-sistema-config/usuario/usuario-empleado-model";
import { FilialModel } from "../../modulo-sistema-config/filial/filial-model";




export class EmpleadoModel {
    constructor(
        public idempleado:number=0,
        public nomempleado:string=null,
        public dni:string=null,
        public fechaingreso:Date=null,
        public fechanacimiento:Date=null,
        public direccion:string=null,
        public telefono:string=null,
        public email:string=null,
        public filial:FilialModel=null,

        public activo:boolean=null,
        public fechaRegistroSystema:string=null,
        public fechaRegistroSystemaModifica:string=null,
        public idusuarioCrea:number=null,
        public idusuarioModifica=null
        
    ){

    }
}

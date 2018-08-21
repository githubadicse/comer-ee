import { PerfilModel } from "../perfil/perfil-model";
import { FilialModel } from "../filial/filial-model";
export class UsuarioModel {
    constructor(
        public idusuario:number = 0,
        public nomusuario:string = null,
        public dni:string = null,
        public login:string = null,
        public clave:string = null,
        public activo:boolean = true,
        public perfil:PerfilModel = null,
        public filial:FilialModel = null,
        public status:any = null
    ){
    }
}


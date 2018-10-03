import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private configService: ConfigService) { }

    canActivate() {

        let currentUserName = localStorage.getItem('currentUserName');

        if (currentUserName) {
            let countCambioPass = this.configService.getCntCambioPass() || 0;
            if(countCambioPass == 0){
                this.router.navigate(['/session/confirmarpass']);
                return false;    
            }
            return true;
        }

        this.router.navigate(['/session/signin']);
        return false;
    }
}

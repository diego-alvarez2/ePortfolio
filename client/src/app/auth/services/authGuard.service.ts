import { CanActivate, Router } from "@angular/router";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable(
    { providedIn: 'root' }
)
export class AuthGuardService implements CanActivate {

    private platformId = inject(PLATFORM_ID)

    constructor(private router: Router) {}
     
    canActivate(): boolean {

        if (!isPlatformBrowser(this.platformId)) {
            return true;
        }
        
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.log("Redirecting... ");
            this.router.navigateByUrl('/');
            return false;
        }
    
        return true;
    }
}
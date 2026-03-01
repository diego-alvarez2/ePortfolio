import { isPlatformBrowser } from "@angular/common";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    private platformId = inject(PLATFORM_ID);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(!isPlatformBrowser(this.platformId)) {
            return next.handle(req);
        }
        
        const token = localStorage.getItem('token')
        
        if (!token) {
            return next.handle(req);
        }
        
        const authReq = req.clone({ // Request is immutable
            setHeaders: {
                Authorization: token ?? '',
            }
        });
        return next.handle(authReq);
    }
}
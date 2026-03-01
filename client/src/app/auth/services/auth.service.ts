import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, Observable } from "rxjs";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import { SocketService } from "../../shared/services/socket.service";

@Injectable({
    providedIn: 'root'
}) 
export class AuthService {
    
    currentUser$ = new BehaviorSubject<CurrentUserInterface | null | undefined>(undefined); // Best to work with streams in Angular

    isLoggedIn$ = this.currentUser$.pipe(map(currentUser => !!currentUser));
    
    constructor(private http: HttpClient, private socketService: SocketService) {}

    getCurrentUser(): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/user';
        return this.http.get<CurrentUserInterface>(url);
    }

    register(registerRequest: RegisterRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users';
        return this.http.post<CurrentUserInterface>(url, registerRequest);
    }

    login(loginRequest: LoginRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users/login';
        return this.http.post<CurrentUserInterface>(url, loginRequest);
    }

    setToken(currentUser: CurrentUserInterface): void {
        localStorage.setItem('token', currentUser.token);
    }

    setCurrentUser(currentUser: CurrentUserInterface | null): void {
        this.currentUser$.next(currentUser);

        if (currentUser) {
            this.socketService.setupSocketConnection(currentUser);
        }
        else {
            this.socketService.disconnect();
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        this.currentUser$.next(null);
        this.socketService.disconnect();
    }

    initializeAuth(): void {
        const token = localStorage.getItem('token');
      
        if (!token) {
          this.currentUser$.next(null);
          return;
        }
      
        this.getCurrentUser().subscribe({
          next: (user) => {
            this.currentUser$.next(user);
            this.socketService.setupSocketConnection(user);
          },
          error: () => {
            this.currentUser$.next(null);
            localStorage.removeItem('token');
          }
        });
      }
}
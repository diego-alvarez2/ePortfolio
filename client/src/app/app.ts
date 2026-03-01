import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { SocketService } from './shared/services/socket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthModule],
  templateUrl: './app.html',
  
})
export class App implements OnInit {
  
  constructor(private authService: AuthService, private socketService: SocketService) {}
  
  ngOnInit(): void {
      
    const token = localStorage.getItem('token');

    if (!token) {
      this.authService.setCurrentUser(null);
      return;
    }
    
    this.authService.getCurrentUser().subscribe({
      next: (currentUser) => {
          this.socketService.setupSocketConnection(currentUser);
          this.authService.setCurrentUser(currentUser);
        },
        error: (err) => {
          console.log('err', err);
          this.authService.setCurrentUser(null);
        }
      });

      /*  This is a test to use to know if user is logged in
      
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        console.log('isLoggedIn', isLoggedIn);
      }) 
        
      */
  }
}

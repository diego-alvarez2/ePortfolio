import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  imports: [CommonModule, RouterLink],
})
export class TopbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}

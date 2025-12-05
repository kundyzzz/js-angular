import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  auth = inject(AuthService);
  router = inject(Router);

  user$ = this.auth.currentUser$;

  async onLogout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}

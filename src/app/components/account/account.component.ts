import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent {
  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.AuthService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}

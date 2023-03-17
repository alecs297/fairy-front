import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isAuthenticated: boolean = false;

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.AuthService.isAuthenticated();
  }
}

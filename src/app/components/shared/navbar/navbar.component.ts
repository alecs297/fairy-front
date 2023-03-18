import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isAuthenticated: boolean = false;

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.AuthService.isAuthenticated();
  }
}

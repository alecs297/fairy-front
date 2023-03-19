import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private AuthService: AuthService) {}

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.AuthService.isAuthenticated()
  }
}

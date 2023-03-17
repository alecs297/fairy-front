import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})


export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login(): Promise<void> {
    const creds = this.loginForm.value;
    let message: string | null = await this.authService.login(creds.username || "", creds.password || "");
    if (message) {
      this.errorMessage = message;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}

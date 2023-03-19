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

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  async login(): Promise<void> {
    const creds = this.loginForm.value;
    this.authService.login(creds.username || "", creds.password || "").subscribe(
      (data) => {
        if (data.message) {
          this.errorMessage = data.message;
        } else {
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          window.location.href = '/dashboard';
        }
      }
    )
  }
}

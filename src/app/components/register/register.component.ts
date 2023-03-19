import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  errorMessage: string | null = null;

  async register(): Promise<void> {
    const creds = this.registerForm.value;
    this.authService.register(creds.username || "", creds.name || "", creds.password || "").subscribe(
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

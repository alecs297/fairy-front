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
  ) { }

  errorMessage: string | null = null;

  async register(): Promise<void> {
    const creds = this.registerForm.value;
    let message: string | null = await this.authService.register(creds.username || "", creds.name || "", creds.password || "");
    if (message) {
      this.errorMessage = message;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}

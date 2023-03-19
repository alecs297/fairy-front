import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  settingsForm = new FormGroup({
    password: new FormControl(''),
    newPassword: new FormControl('')
  })

  constructor(private authService: AuthService) {}

  message: string | null = null;

  changePassword(): void {
    const creds = this.settingsForm.value;
    this.authService.changePassword(creds.password || "", creds.newPassword || "").subscribe(
      (data) => {
        if (data.message) {
          this.message = data.message;
        } else {
          this.message = "Password changed successfully.";
          this.settingsForm.reset();
        }
      });
  }

  logout(): void {
    this.authService.logout();
  }
}

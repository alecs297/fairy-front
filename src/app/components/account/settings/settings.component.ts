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

  constructor(private AuthService: AuthService) {}

  message: string | null = null;

  changePassword(): void {
    const creds = this.settingsForm.value;
    let message: string | null = this.AuthService.changePassword(creds.password || "", creds.newPassword || "");
    this.message = message || "Password changed successfully.";
  }
}

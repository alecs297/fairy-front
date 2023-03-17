import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  settingsForm = new FormGroup({
    password: new FormControl(''),
    newPassword: new FormControl('')
  })
}

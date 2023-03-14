import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  register(): string | true {

    return true;
  }
}

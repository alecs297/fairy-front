import { Component } from '@angular/core';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  constructor(private authService: AuthService) { }

  user = this.authService.getUser() || {
    username: "Loading",
    name: "loading",
    badges: [],
    image: "Loading..."
    
  };
}

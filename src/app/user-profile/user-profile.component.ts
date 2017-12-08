import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
}

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    //this.auth.user.subscribe()
  }

  logout() {
    this.auth.signOut();
  }

}

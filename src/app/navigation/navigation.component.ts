import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(public auth: AuthService, private router: Router) { }

  logout() {
    this.auth.signOut();
  }

}

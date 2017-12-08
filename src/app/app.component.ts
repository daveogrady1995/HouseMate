import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { AuthService } from './core/auth.service';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public auth: AuthService) { }

  logout() {
    this.auth.signOut();
  }
  
}

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

export class AppComponent implements OnInit {

  private user:User

  constructor(public auth: AuthService) { }

  ngOnInit() {  
    // retrieve logged in user info
    this.auth.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.user.displayName = auth.displayName;
      }
    })
  }

  logout() {
    this.auth.signOut();
  }
  
}

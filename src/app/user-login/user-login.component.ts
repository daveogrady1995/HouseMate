import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  private userID;

  constructor(public auth: AuthService, private router: Router) { 
    document.body.style.background = 
    "url('../../assets/images/house-mate.jpg') no-repeat center center fixed"; 
    document.body.style.backgroundSize = "cover";
  }


  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigate(['/preferences']);
  }

  signInWithGoogle(): void {
    this.auth.googleLogin()
      .then(() => this.afterSignIn());
  }

  signInWithFacebook(): void {
    this.auth.facebookLogin()
      .then(() => this.afterSignIn());
  }

  /// Anonymous Sign In
  signInAnonymously() {
    this.auth.anonymousLogin()
      .then(() => this.afterSignIn());
  }

   logout() {
    this.auth.signOut();
  }

}

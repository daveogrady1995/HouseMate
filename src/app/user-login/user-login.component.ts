import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/auth.service";
import { Router } from "@angular/router";
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  userPreferences?: any;
  flatPreferences?: any;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit  {

  properties: any = [];
  private userID;

  private currentUserID: string;
  private userCollection: AngularFirestoreCollection<User>;
  private observableUsers: Observable<User[]>;

  constructor(public auth: AuthService, private router: Router, 
    private http: Http, private afAuth: AngularFireAuth, private afs: AngularFirestore) { 

      //this.http.get("api/test").map(res => this.testData = res);
      //console.log(this.testData);
  }

  ngOnInit() {
    
  }

  private afterSignIn(): void {
    // get uid of current user logged in
    this.afAuth.authState.subscribe((user: User) => {
      this.currentUserID = user.uid

      // retrieve current user object based on user id
      this.userCollection = this.afs.collection('users', ref => {
        return ref.where('uid', '==', this.currentUserID)
      });
      this.observableUsers = this.userCollection.valueChanges();
      // subscribe to observable and retrieve users
      this.observableUsers.subscribe((users: User[]) => {
        // has no details and new to app
        if(users[0] == null) {
          this.router.navigate(['/preferences']);
        }
        // If user has already filled out preferences then go to browse screen
        else if (users[0].flatPreferences != null && users[0].userPreferences != null) {
          this.router.navigate(['/browse-housemates']);
        }
        else {
          this.router.navigate(['/preferences']);
        }
      });
    });
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

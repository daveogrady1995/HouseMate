import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from "../core/auth.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
}

interface UserPreferences {
  occupation: string;
  smoker: string;
  lifestyle: string;
  boozer: string;
}

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent {

  private currentUserID: string;

  private occupation: string = '';
  private smoker: string = '';
  private lifestyle: string = '';
  private boozer: string = '';
  

  constructor(private afs: AngularFirestore,
    private auth: AuthService,
    private afAuth: AngularFireAuth) { 

      document.documentElement.style.backgroundImage = "none";
      document.body.style.background = "none";
      document.body.style.backgroundColor = "lightgrey";
      /* Move down content because we have a fixed navbar that is 3.5rem tall */
      document.body.style.marginTop = "4.5em";
  }


  submitPreferences() : void {
    // get the current user id
    this.afAuth.authState.subscribe((user: User) => {
      this.currentUserID = user.uid
    });

    // get a reference of the user document
    const userRef: AngularFirestoreDocument<UserPreferences> = this.afs.doc(`users/${this.currentUserID}`);

    const data: UserPreferences = {
      occupation: this.occupation,
      smoker: this.smoker,
      lifestyle: this.lifestyle,
      boozer: this.boozer
    }

    // update user document with preferences
    userRef.update(data)
  }



}

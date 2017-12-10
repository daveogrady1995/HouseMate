import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from "../core/auth.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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

  public occupation: string = 'Student';
  public smoker: string = 'Yes';
  public lifestyle: string = 'Early Bird';
  public boozer: string = 'Yes';
  

  constructor(private afs: AngularFirestore,public auth: AuthService) { 
  }


  submitPreferences() : void {
    // get a reference of the user document
    const userRef: AngularFirestoreDocument<UserPreferences> = this.afs.doc(`users/${this.auth.currentUserID}`);

    const data: UserPreferences = {
      occupation: this.occupation,
      smoker: this.smoker,
      lifestyle: this.lifestyle,
      boozer: this.boozer
    }

    debugger;

    // update user document with preferences
    userRef.update(data)
  }



}

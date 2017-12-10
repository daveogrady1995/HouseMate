import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent {

  userPrefForm: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore,
  public auth: AuthService) { 

    this.userPrefForm = this.fb.group({
      'occupation' : [null, Validators.required],
      'smoker' : [null, Validators.required],
      'lifestyle' : [null, Validators.required],
      'boozer' : [null, Validators.required]
    });
  }


  submitPreferences() : void {
   console.log(this.userPrefForm.get('occupation'));

    // get a reference of the user document
    //const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.auth.user}`);
  }



}

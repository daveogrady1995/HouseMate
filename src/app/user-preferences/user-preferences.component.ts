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
export class UserPreferencesComponent implements OnInit {

  userPrefForm: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore,
  public auth: AuthService) { 

    this.userPrefForm = this.fb.group({
      'occupation' : [null, Validators.required],
      'otherDetails' : [null, Validators.required],
      'gender' : [null, Validators.required],
      'smoker' : [null, Validators.required],
      'petLover' : [null, Validators.required]
    });
  }

  ngOnInit() {
    // retrieve user who is currently logged in
    // this.auth.getCurrentUserObservable().subscribe((user: User) => {
    //    this.currentUser = {
    //     uid: user.uid,
    //     email: user.email || null,
    //     displayName: user.displayName || 'nameless user',
    //     photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    //   }
    // });
    // console.log(this.currentUser);
    
  }

  submitPreferences() : void {
    //console.log(this.userPrefForm.value['occupation'])

    // get a reference of the user document
    //const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.auth.user}`);
  }



}

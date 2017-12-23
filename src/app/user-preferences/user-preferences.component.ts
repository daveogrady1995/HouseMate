import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from "../core/auth.service";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NavigationComponent } from '../navigation/navigation.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
}

// interface UserPreferences {
//   occupation: string;
//   smoker: string;
//   lifestyle: string;
//   boozer: string;
// }

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {

  private currentUserID: string;

  private personality: string = 'Introvert';
  private occupation: string = 'Working Professional';
  private smoker: string = 'Yes';
  private lifestyle: string = 'Early Bird';
  

  constructor(private afs: AngularFirestore,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    public toastr: ToastsManager,
    private router: Router) { 
  }

  ngOnInit() {

    //get the current user id
    this.afAuth.authState.subscribe((user: User) => {

      this.currentUserID = user.uid;
    });

  }


  submitPreferences(): void {
    // get a reference of the user document
      const userRef = this.afs.doc(`users/${this.currentUserID}`);


      const userPref = {
        personality: this.personality,
        occupation: this.occupation,
        smoker: this.smoker,
        lifestyle: this.lifestyle,
      }

      // update user document with preferences
      userRef.update({
        userPreferences: userPref,
      });

      this.toastr.success('Your preferences have been updated!', 'Success!');
      this.router.navigate(['/browse-housemates']);
  }
}

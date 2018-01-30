import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from "../core/auth.service";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { NavigationComponent } from '../navigation/navigation.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  userPreferences?: any;
}

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {

  private currentUserID: string;

  userCollection: AngularFirestoreCollection<User>;
  observableUsers: Observable<User[]>;

  user: User[];

  // default properties
  private personality: string = '';
  private occupation: string = '';
  private smoker: string = '';
  private lifestyle: string = '';
  

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

      // retrieve users collection in database
      this.userCollection = this.afs.collection('users', ref => {
        return ref.where('uid', '==', this.currentUserID)
      });
      this.observableUsers = this.userCollection.valueChanges(); // observable of user data 
      
      // subscribe and retrieve user object
      this.observableUsers.subscribe((users: User[]) => {
        this.user = users

        // if the user already has preferences then populate form with them
        if(this.user[0].userPreferences) {

          let userPreferences = this.user[0].userPreferences;
          this.personality = userPreferences.personality;
          this.occupation = userPreferences.occupation;
          this.smoker = userPreferences.smoker;
          this.lifestyle = userPreferences.lifestyle;
        }  

        // otherwise set default properties
        else {
          this.personality = 'Introvert';
          this.occupation = 'Working Professional';
          this.smoker = 'Yes';
          this.lifestyle = 'Early Bird';
        }

      });
   
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

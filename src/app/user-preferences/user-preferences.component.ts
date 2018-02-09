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
  flatPreferences?: any;
}

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {

  // keep track of form we are on
  // user preferences or flat preferences
  private currentFormQs: number = 0;

  private currentUserID: string;

  userCollection: AngularFirestoreCollection<User>;
  observableUsers: Observable<User[]>;

  user: User[];

  public checkFlatModel: any = { single: false, double: true, twin: false };

  // default userPref properties
  private personality: string = '';
  private occupation: string = '';
  private smoker: string = '';
  private lifestyle: string = '';

  // default flatPref properties
  private roomtype: string = '';
  private flatRent: number;
  private flatLocation: string = '';

  private locationNotValid: boolean = false;
  private rentNotValid: boolean = false;
  

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

        // if the user already has user preferences then populate form with them
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

        // if the user already has user preferences then populate form with them
        if(this.user[0].flatPreferences) {
          let flatPreferences = this.user[0].flatPreferences;
          this.flatLocation = flatPreferences.flatLocation;
          this.flatRent = flatPreferences.flatRent;
          this.roomtype = flatPreferences.roomType;

        }

        // otherwise set default properties
        else {
          this.roomtype = 'Double'
        }

      });
   
    });

  }


  submitPreferences(): void {
    // get a reference of the user document
      const userRef = this.afs.doc(`users/${this.currentUserID}`);

      // reached end of questions
      if(this.currentFormQs == 1)
      {

        if(this.formIsValid()) {

          const userPref = {
            personality: this.personality,
            occupation: this.occupation,
            smoker: this.smoker,
            lifestyle: this.lifestyle,
          }

          const flatPref = {
            roomType: this.roomtype,
            flatRent: this.flatRent,
            flatLocation: this.flatLocation,
          }
    
          // update user document with preferences
          userRef.update({
            userPreferences: userPref,
            flatPreferences: flatPref
          });
  
          this.toastr.success('Your preferences have been updated!', 'Success!');
          this.router.navigate(['/browse-housemates']);

        }
        else {
          this.toastr.warning('Form details are missing', 'Warning!');
        }

      }
      else {
        // go to next question
        this.currentFormQs++;
      }
  }

  formIsValid(): boolean {

    let formValid: boolean = true; 

    if(this.flatRent == null) {
      this.rentNotValid = true;
      formValid = false;
    }

    if(this.flatLocation == '') {
      this.locationNotValid = true;
      formValid = false;
    }

    if(!formValid) {
      return false;
    }
    else {
      return true;
    }
  }

}

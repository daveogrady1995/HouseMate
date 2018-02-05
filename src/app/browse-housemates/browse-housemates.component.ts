import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  userPreferences?: any;
}


@Component({
  selector: 'app-browse-housemates',
  templateUrl: './browse-housemates.component.html',
  styleUrls: ['./browse-housemates.component.css']
})
export class BrowseHousematesComponent implements OnInit {

  private currentUserID: string;
  private currentUser: User;

  private userCollection: AngularFirestoreCollection<User>;
  private observableUsers: Observable<User[]>;

  private users: User[];

  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    // get uid of current user logged in
    this.afAuth.authState.subscribe((user: User) => {
      this.currentUserID = user.uid
    });

    this.userCollection = this.afs.collection('users');
    this.observableUsers = this.userCollection.valueChanges(); // observable of user data   

    // subscribe to observable and retrieve users
    this.observableUsers.subscribe((users: User[]) => {
      users.length > 1 ? this.users = users : this.users = null // quick fix to remove existing data

      if (this.users != null) {
        // get current user
        this.users.forEach(user => {
          if (user.uid == this.currentUserID) {
            this.currentUser = user
          }
        });
      }

    });

  }

  // compare preference of logged in user and other users in app
  compareUserMatch(otherUserPreferences: any): number {
    let matchPoints = 0;
    let currentUserPref = this.currentUser.userPreferences;

    if(currentUserPref.lifestyle == otherUserPreferences.lifestyle || (currentUserPref.lifestyle == "Don't Mind" || otherUserPreferences.lifestyle == "Don't Mind"))
      matchPoints++
    if(currentUserPref.occupation == otherUserPreferences.occupation || (currentUserPref.occupation == "Don't Mind" || otherUserPreferences.occupation == "Don't Mind"))
      matchPoints++
    if(currentUserPref.personality == otherUserPreferences.personality || (currentUserPref.personality == "Don't Mind" || otherUserPreferences.personality == "Don't Mind"))
      matchPoints++
    if(currentUserPref.smoker == otherUserPreferences.smoker || (currentUserPref.smoker == "Don't Mind" || otherUserPreferences.smoker == "Don't Mind"))
      matchPoints++

    let matchPercentage = matchPoints / 4;
    return matchPercentage;
    
  }

}





    // this.filteredUserCollection = this.afs.collection('users', ref => {
    //   return ref.where('uid', '==', this.currentUserID)
    //  });
    // this.filteredUsers = this.filteredUserCollection.valueChanges();


    // var userLoggedInPref = this.userCollection
    // });

    // return userPreferences.lifestyle;


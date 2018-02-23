import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  userPreferences?: any;
  flatPreferences?: any;
}

interface TeamUpRequest {
  requesterUid: string;
  recepientUid: string;
  isAccepted: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private loggedInUserID: string;
  private loggedInUser: User;

  private messageCount: number = 0; // show unread message count

  private usersCollection: AngularFirestoreCollection<User>;
  private observableUsers: Observable<User[]>;

  private teamUpRequestsCollection: AngularFirestoreCollection<TeamUpRequest>;
  private observableTeamUpRequests: Observable<TeamUpRequest[]>;

  constructor(public auth: AuthService, 
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router) { }


  ngOnInit() {
    // get uid of  logged in user
    this.afAuth.authState.subscribe((user: User) => {
      this.loggedInUserID = user.uid

      // get logged in user object
      this.getLoggedInUser();

      // display team requests in nav
      this.getTeamRequestsCount();
      
    });


  } 
  
  logout() {
    this.auth.signOut();
  }

  getLoggedInUser() {
    // query database to retrieve user logged in
    this.usersCollection = this.afs.collection('users', ref => {
      return ref.where('uid', '==', this.loggedInUserID)
    });
    this.observableUsers = this.usersCollection.valueChanges(); // observable of user data   

    // subscribe to observable and team up requests
    this.observableUsers.subscribe((users: User[]) => {
      debugger;
      this.loggedInUser = users[0]; // number of requests displayed in nav
    });

  }

  getTeamRequestsCount() {

    // query database to retrieve team requests sent to user logged in that are unaccepted
    this.teamUpRequestsCollection = this.afs.collection('teamUpRequests', ref => {
      return ref.where('recepient.uid', '==', this.loggedInUserID).where('isAccepted', '==', false)
    });
    this.observableTeamUpRequests = this.teamUpRequestsCollection.valueChanges(); // observable of user data   

    // subscribe to observable and team up requests
    this.observableTeamUpRequests.subscribe((teamRequests: TeamUpRequest[]) => {
      this.messageCount = teamRequests.length; // number of requests displayed in nav
    });
  }


}

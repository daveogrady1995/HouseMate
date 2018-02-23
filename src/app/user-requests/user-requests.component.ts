import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface TeamUpRequest {
  recepient: any;
  requester: any;
  isAccepted: boolean;
}

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  userPreferences?: any;
  flatPreferences?: any;
}


@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {

  private loggedInUserID: string;
  private teamRequests: TeamUpRequest[];

  private requestCount: number;

  private teamUpRequestsCollection: AngularFirestoreCollection<TeamUpRequest>;
  private observableTeamUpRequests: Observable<TeamUpRequest[]>;

  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {

       // get uid of  logged in user
       this.afAuth.authState.subscribe((user: User) => {
        this.loggedInUserID = user.uid
  
        // get team requests sent by other users
        this.getTeamRequests();
        
      });
  }

  getTeamRequests() {
    // query database to retrieve team requests sent to user logged in that are unaccepted
    this.teamUpRequestsCollection = this.afs.collection('teamUpRequests', ref => {
      return ref.where('recepient.uid', '==', this.loggedInUserID).where('isAccepted', '==', false)
    });
    this.observableTeamUpRequests = this.teamUpRequestsCollection.valueChanges(); // observable of user data   

    // subscribe to observable and retrieve team up requests
    this.observableTeamUpRequests.subscribe((teamRequests: TeamUpRequest[]) => {
      this.teamRequests = teamRequests;
      this.requestCount = teamRequests.length;
    });
  }

}

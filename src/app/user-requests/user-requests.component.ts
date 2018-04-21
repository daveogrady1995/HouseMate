import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

interface TeamUpRequest {
  uid: string;
  recepient: any;
  requester: any;
  isAccepted: boolean;
}

interface Team {
  teamLeader: User;
  teamMember: User;
  teamUid: string;
}

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  userPreferences?: any;
  flatPreferences?: any;
  teams?: any[];
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
  private teamsCollection: AngularFirestoreCollection<Team>;

  constructor(private afs: AngularFirestore,
    public toastr: ToastsManager,
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

  acceptTeamRequest(docUid) {
    const request = {
      isAccepted: true
    }
    // update accept field to true
    this.teamUpRequestsCollection.doc(docUid).update(request);

    // retrieve data from team request to put into teams field
    let teamRequest: TeamUpRequest;
    this.teamRequests.forEach(request => {
      if(request.uid == docUid) {
        teamRequest = request
      }
    });

    const userRef = this.afs.doc(`teams/${docUid}`);
    const teamData: Team = {
      teamLeader: teamRequest.requester,
      teamMember: teamRequest.recepient,
      teamUid: docUid
    }
    debugger;
    userRef.set(teamData);

    this.toastr.success('You have accepted this team request', 'Accepted!');

  }

  declineTeamRequest(docUid) {
    // remove team request from database
    this.teamUpRequestsCollection.doc(docUid).delete();
    this.toastr.error('You have declined this team request', 'Declined!');
  }

}

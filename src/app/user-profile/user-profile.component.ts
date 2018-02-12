import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Params } from '@angular/router/src/shared';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  userPreferences?: any;
}

interface TeamUpRequest {
  requesterUid: string;
  recepientUid: string;
  isAccepted: boolean;
}

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // user logged in
  private loggedInUserID: string;

  // other user
  private currentUserID: string; 
  private selectedUser: User;

  private teamUpRequestSent: boolean = false;

  private userCollection: AngularFirestoreCollection<User>;
  private observableUsers: Observable<User[]>;

  constructor(private route: ActivatedRoute, 
    private afs: AngularFirestore,
    public toastr: ToastsManager,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    // get selected users UID
    this.route.params.subscribe((params: Params) => {
      this.currentUserID = params['uid'];
    });

    // query database to retrieve selected user
    this.userCollection = this.afs.collection('users', ref => {
      return ref.where('uid', '==', this.currentUserID)
    });
    this.observableUsers = this.userCollection.valueChanges(); // observable of user data 

    // subscribe and retrieve user object
    this.observableUsers.subscribe((users: User[]) => {
      this.selectedUser = users[0]
    });

    // get the logged in user id
    this.afAuth.authState.subscribe((user: User) => {
      this.loggedInUserID = user.uid;
    });

  }

  teamUpWithUser() {
      // get a reference of a new team up request document from this user
      const teamUpReqRef: AngularFirestoreDocument<TeamUpRequest> = this.afs.doc(`teamUpRequests/${this.currentUserID}`);

      // create new team request
      const data: TeamUpRequest = {
        requesterUid: this.loggedInUserID,
        recepientUid: this.currentUserID,
        isAccepted: false
      }

      // update document
       teamUpReqRef.set(data);

       this.teamUpRequestSent = true;
       this.toastr.success('Request has been sent!', 'Success!');
  }

}

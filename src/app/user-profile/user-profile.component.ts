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
  flatPreferences?: any;
}

interface TeamUpRequest {
  uid: string;
  requester: any;
  recepient: any;
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
  private loggedInUser: User;

  // selected user
  private currentUserID: string; 
  private currentUser: User;

  private teamUpRequestSent: boolean = false;

  private userCollection: AngularFirestoreCollection<User>;
  private observableUsers: Observable<User[]>;
  private users: User[];

  constructor(private route: ActivatedRoute, 
    private afs: AngularFirestore,
    public toastr: ToastsManager,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    // get selected users UID
    this.route.params.subscribe((params: Params) => {
      this.currentUserID = params['uid'];
    });

    // get the logged in user id
    this.afAuth.authState.subscribe((user: User) => {
      this.loggedInUserID = user.uid;
    });

    this.userCollection = this.afs.collection('users');
    this.observableUsers = this.userCollection.valueChanges(); // observable of user data  

    // subscribe to observable and retrieve users
    this.observableUsers.subscribe((users: User[]) => {
      this.users = users;

      // get selected user and logged in user
      this.users.forEach(user => {
        if (user.uid == this.currentUserID) {
          this.currentUser = user;
        }
        if (user.uid == this.loggedInUserID) {
          this.loggedInUser = user;
        }
      });
    });

  }

  teamUpWithUser() {
    const requester = {
      uid: this.loggedInUser.uid,
      displayName: this.loggedInUser.displayName,
      photoURL: this.loggedInUser.photoURL,
      flatLocation: this.loggedInUser.flatPreferences.flatLocation
    }

    const recepient = {
      uid: this.currentUser.uid,
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
      flatLocation: "Sligo"
    }


    // generate uid
    const pushkey = this.afs.createId();

    // get a reference of a new team up request document
    const teamUpReqRef: AngularFirestoreDocument<TeamUpRequest> = this.afs.doc(`teamUpRequests/${pushkey}`);

    // create new team request sent from logged in user to selected user
    const data: TeamUpRequest = {
      uid: pushkey,
      requester: requester,
      recepient: recepient,
      isAccepted: false
    }

    // add new document
    teamUpReqRef.set(data);


    this.teamUpRequestSent = true;
    this.toastr.success('Team Request has been sent to ' + recepient.displayName, 'Success!');
  }

}

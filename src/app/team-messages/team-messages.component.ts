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

interface Team {
  teamLeader: User;
  teamMember: User;
  docUId: string;
  messages: Message[];
}

interface Message {
  content: string;
  sentByUser: User;
  sentToUser: User;
}

@Component({
  selector: 'app-team-messages',
  templateUrl: './team-messages.component.html',
  styleUrls: ['./team-messages.component.css']
})
export class TeamMessagesComponent implements OnInit {

  private teamUId: string;
  private team: Team;

  private messageContent: string = null;

  teamCollection: AngularFirestoreCollection<Team>;
  observableTeam: Observable<Team[]>;

  userCollection: AngularFirestoreCollection<User>;
  observableUser: Observable<User[]>;

  private loggedInUserID: string;
  private loggedInUser: User;

  constructor(private route: ActivatedRoute, 
    private afs: AngularFirestore,
    public toastr: ToastsManager,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    // retrieve team messages for current user based on teamUid
    this.route.params.subscribe((params: Params) => {
      this.teamUId = params['teamUid'];
    });

    // get the logged in user id
    this.afAuth.authState.subscribe((user: User) => {
      this.loggedInUserID = user.uid;

      // retrieve current user object based on user id
      this.userCollection = this.afs.collection('users', ref => {
        return ref.where('uid', '==', this.loggedInUserID)
      });
      this.observableUser = this.userCollection.valueChanges(); // observable of user data 

      // subscribe to observable and get teams that current user belongs to
      this.observableUser.subscribe((users: User[]) => {
        this.loggedInUser = users[0];
      });
    });

    // retrieve team based on teamUid passed into component
    this.teamCollection = this.afs.collection('teams', ref => {
      return ref.where('teamUid', '==', this.teamUId)
    });
    this.observableTeam = this.teamCollection.valueChanges(); // observable of user data 

    // subscribe to observable and get teams that current user belongs to
    this.observableTeam.subscribe((teams: Team[]) => {
      this.team = teams[0];
      debugger;
    });
  }

  submitMessage() {
    if (this.messageContent != null) {

      const teamsRef = this.afs.doc(`teams/${this.teamUId}`);

      let otherUser: User = null;

      // retrieve other user in team
      if (this.team.teamLeader.uid != this.loggedInUserID) {
        otherUser = this.team.teamLeader;
      }
      else {
        otherUser = this.team.teamMember;
      }

      const teamMessage: Message = {
        content: this.messageContent,
        sentByUser: this.loggedInUser,
        sentToUser: otherUser
      }

      // if current team has no messages then assign empty array
      if (this.team.messages == null) {
        this.team.messages = [];
        this.team.messages.push(teamMessage);
      }
      else {
        this.team.messages.push(teamMessage);
      }

      debugger;
      // update team with new messages
      teamsRef.update(this.team);

    }

  }

}

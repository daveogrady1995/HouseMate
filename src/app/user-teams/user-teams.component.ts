import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { debug } from 'util';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  userPreferences?: any;
  flatPreferences?: any;
  teamUid?: any; // store teamUid user belongs to for now here
}

interface Team {
  teamLeader: User;
  teamMember: User;
  teamUid: string;
}

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.css']
})
export class UserTeamsComponent implements OnInit {

  private loggedInUserID: string;
  private userTeams: User[];

  private teams: Team[];
  private teamsCount: number;

  private teamCount: number;
  private teamsCollection: AngularFirestoreCollection<Team>;
  private observableTeams: Observable<Team[]>;

  constructor(private afs: AngularFirestore,
    public toastr: ToastsManager,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    // get uid of  logged in user
    this.afAuth.authState.subscribe((user: User) => {
      this.loggedInUserID = user.uid

      // get teams logged in user belongs to
      this.getUserTeams();
    });

  }

  getUserTeams() {
    let users: User[] = [];
    let userTeams: User[] = [];

    this.teamsCollection = this.afs.collection('teams');
    this.observableTeams = this.teamsCollection.valueChanges();

    // subscribe to observable and get teams that current user belongs to
    this.observableTeams.subscribe((teams: Team[]) => {
      // this is clumsy code which looks at each team and if user logged in exists in that
      // team then look at the other user in the team and store their details
      for (let i = 0; i < teams.length; i++) {
        if(teams[i].teamLeader.uid == this.loggedInUserID || teams[i].teamMember.uid == this.loggedInUserID) {
          if(teams[i].teamLeader.uid != this.loggedInUserID) {
            users[i] = teams[i].teamLeader;
            // store teamUid user belongs to
            users[i].teamUid = teams[i].teamUid;
          }
          else {
            users[i] = teams[i].teamMember;
            // store teamUid user belongs to
            users[i].teamUid = teams[i].teamUid;
          }
        }
      }

      users.forEach(user => {
        if(user != null) {
          userTeams.push(user);
        }
      });

      debugger;
      this.userTeams = userTeams;
      this.teamsCount = this.userTeams.length;
    });
  }
}

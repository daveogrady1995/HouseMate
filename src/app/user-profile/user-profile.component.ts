import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Params } from '@angular/router/src/shared';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  userPreferences?: any;
}

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private currentUserID: string; 
  private selectedUser: User;

  private userCollection: AngularFirestoreCollection<User>;
  private observableUsers: Observable<User[]>;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) { }

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
    })

  }

}

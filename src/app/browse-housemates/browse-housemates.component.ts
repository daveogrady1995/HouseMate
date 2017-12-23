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
}


@Component({
  selector: 'app-browse-housemates',
  templateUrl: './browse-housemates.component.html',
  styleUrls: ['./browse-housemates.component.css']
})
export class BrowseHousematesComponent implements OnInit {

  private currentUserID: string;

  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>

  constructor(private afs: AngularFirestore, 
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    // get uid of current user logged in
    this.afAuth.authState.subscribe((user: User) => {
      this.currentUserID = user.uid
    });

    // retrieve all users from database
    this.userCollection = this.afs.collection('users');
    this.users = this.userCollection.valueChanges(); // observable of user data   
  }

}

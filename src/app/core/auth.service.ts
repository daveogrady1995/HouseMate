import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
}


@Injectable()
export class AuthService {

  user: Observable<User | null>;

  // variables to hold user if they already exist in database
  private observableExistingUser: Observable<User[]>
  private existingUserCollection: AngularFirestoreCollection<User>;
  public existingUser: User;

  public globalVariable = "this is global";

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    //provider.addScope('user_birthday');
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.oAuthLogin(provider);
  }


  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        return this.updateUserData(credential.user)
      })
      .catch(error => this.handleError(error));
  }


  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        return this.updateUserData(user) // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user) // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user) // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .catch((error) => this.handleError(error))
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error) {
    console.error(error)
  }

  // Updates user data to firestore after succesful login
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // retrieve current user object based on user id
    this.existingUserCollection = this.afs.collection('users', ref => {
      return ref.where('uid', '==', user.uid)
    });
    this.observableExistingUser = this.existingUserCollection.valueChanges();

    // subscribe to observable and check if user exists already
    this.observableExistingUser.subscribe((existUser: User[]) => {
      this.existingUser = existUser[0];

      const data: User = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || 'nameless user',
        photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
      }
  
      // if user exists already just do an update
      // otherwise create a new document
      if(this.existingUser) {
        return userRef.update(data)
      }
      else {
        return userRef.set(data)
      }
    });
  }
  
}
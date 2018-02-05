import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs/operators/retry';
import { AngularFireAuth } from 'angularfire2/auth';

interface User {
    uid: string;
    email?: string;
    photoURL?: string;
    displayName?: string;
    userPreferences?: any;
    userMatchPerc?: number; // temp property match %
}

@Pipe({
    name: 'orderbyMatch'
    //pure: false
})
export class OrderbyMatch implements PipeTransform {

    currentUserID: string;
    currentUser: User;

    filteredUsers: User[];

    constructor(private afAuth: AngularFireAuth) { }

    transform(allUsers: User[]) {

        if(allUsers) {

            // get current user ID logged in
            this.afAuth.authState.subscribe((user: User) => {
                this.currentUserID = user.uid

                // get current user
                allUsers.forEach(user => {
                    if (user.uid == this.currentUserID) {
                        this.currentUser = user
                    }
                });

                // for each user compare preferences of logged in user and other users
                allUsers.forEach(user => {

                    if (user.uid != this.currentUserID) {
                        user.userMatchPerc = this.compareUserMatch(user)
                        this.filteredUsers.push(user);
                        console.log(this.filteredUsers);
                    }
                });

                console.log(this.filteredUsers);

            });

            return allUsers;
        }
        else {
            return null
        }

      
        // if (typeof items === 'object') {
        //     var resultArray = [];
        //     if (args.length === 0) {
        //         resultArray = items;
        //     }

        //     else {
        //         for (let item of items) {
        //             if (item.name != null && item.name.match(new RegExp(''+args, 'i'))) {
        //                 resultArray.push(item);
        //             }
        //         }
        //     }

        //     return resultArray;
        // }
        // else {
        //     return null;
        // }

    }

    
  // compare preference of logged in user and other users in app
  compareUserMatch(otherUser: User): number {
    console.log(otherUser);
    let matchPoints = 0;
    let currentUserPref = this.currentUser.userPreferences;
    let otherUserPreferences = otherUser.userPreferences;

    if(currentUserPref.lifestyle == otherUserPreferences.lifestyle || (currentUserPref.lifestyle == "Don't Mind" || otherUserPreferences.lifestyle == "Don't Mind"))
      matchPoints++
    if(currentUserPref.occupation == otherUserPreferences.occupation || (currentUserPref.occupation == "Don't Mind" || otherUserPreferences.occupation == "Don't Mind"))
      matchPoints++
    if(currentUserPref.personality == otherUserPreferences.personality || (currentUserPref.personality == "Don't Mind" || otherUserPreferences.personality == "Don't Mind"))
      matchPoints++
    if(currentUserPref.smoker == otherUserPreferences.smoker || (currentUserPref.smoker == "Don't Mind" || otherUserPreferences.smoker == "Don't Mind"))
      matchPoints++

    let matchPercentage = matchPoints / 4;

    return matchPercentage;   
  }

}
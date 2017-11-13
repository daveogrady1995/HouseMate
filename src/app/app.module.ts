import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';


export const firebaseConfig = {
  apiKey: "AIzaSyAV5OkUJdAW68UNpjPuXmLI_nE7CPmeDLk",
  authDomain: "housemate-88328.firebaseapp.com",
  databaseURL: "https://housemate-88328.firebaseio.com",
  projectId: "housemate-88328",
  storageBucket: "",
  messagingSenderId: "997928221254"
};

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserLoginComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
